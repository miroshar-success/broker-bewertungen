import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import moment from 'moment';
import { orderByUtils } from '../utils/orderByUtils';
import FileRepository from './fileRepository';
import PageRelatedLinkRepository from './pageRelatedLinkRepository';
import NavigationRepositoryEx from './extends/navigationRepositoryEx';

const Op = Sequelize.Op;

class PageWarningRepository {
  static ALL_FIELDS = ['title', 'body'];

  static _relatedData(data) {
    return {
      title: data.title ?? null,
      body: data.body ?? null,
      ip: '',
    };
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    const record =
      await options.database.page_warning.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data),
          created: moment.now(),
          modified: moment.now(),
        },
        {
          transaction,
        },
      );

    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record =
      await options.database.page_warning.findOne({
        where: {
          id,
        },
        transaction,
      });

    if (!record) {
      throw new Error404();
    }
    record = await record.update(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
        modified: moment.now(),
      },
      {
        transaction,
      },
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record =
      await options.database.page_warning.findOne({
        where: {
          id,
        },
        transaction,
      });

    if (!record) {
      throw new Error404();
    }

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = [];

    const record =
      await options.database.page_warning.findOne({
        where: {
          id,
        },
        include,
        transaction,
      });

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(
      record,
      options,
      false,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const where = {
      id: {
        [Op.in]: ids,
      },
    };

    const records =
      await options.database.page_warning.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.page_warning.count({
      where: {
        ...filter,
      },
      transaction,
    });
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];
    const include = [];
    if (filter) {
      if (filter.idRange) {
        const [start, end] = filter.idRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            id: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            id: {
              [Op.lte]: end,
            },
          });
        }
      }

      ['title', 'body'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'page_warning',
              field,
              filter[field],
            ),
          );
        }
      });
    }

    const where = { [Op.and]: whereAnd };
    let { rows, count } =
      await options.database.page_warning.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderByUtils(orderBy, options)]
          : [['id', 'DESC']],
        transaction:
          SequelizeRepository.getTransaction(options),
      });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
      true,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    query,
    limit,
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: query },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'page_warning',
              'title',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.page_warning.findAll({
        attributes: ['id', 'title'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['title', 'ASC']],
      });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'page_warning',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
    metaOnly,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(
          record,
          options,
          metaOnly,
        ),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    if (metaOnly) {
      return output;
    }

    const transaction =
      SequelizeRepository.getTransaction(options);

    return output;
  }
}

export default PageWarningRepository;
