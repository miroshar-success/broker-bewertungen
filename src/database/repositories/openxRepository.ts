import { IRepositoryOptions } from './IRepositoryOptions';
import { orderByUtils } from '../utils/orderByUtils';
import AuditLogRepository from './auditLogRepository';
import Error400 from '../../errors/Error400';
import lodash from 'lodash';
import md5 from 'crypto-js/md5';
import moment from 'moment';
import Sequelize from 'sequelize';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import SequelizeRepository from './sequelizeRepository';

const Op = Sequelize.Op;

class OpenxRepository {
  static ALL_FIELDS = [
    'code',
    'noscript',
    'activated',
    'zone',
  ];

  static _relatedData(data, options) {
    return {
      hash: md5(data.code).toString(),
      ip: data.ip || '',
    };
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.openx_banner.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data, options),
          created: moment(),
          modified: moment(),
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
      await options.database.openx_banner.findOne({
        where: {
          id,
        },
        transaction,
      });

    if (!record) {
      throw new Error400(
        options.language,
        'entities.openx.errors.update',
      );
    }

    record = await record.update(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data, options),
        modified: moment(),
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
      await options.database.openx_banner.findOne({
        where: {
          id,
        },
        transaction,
      });

    if (!record) {
      throw new Error400(
        options.language,
        'entities.openx.errors.destroy',
      );
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
      await options.database.openx_banner.findOne({
        where: {
          id,
        },
        include,
        transaction,
      });
    if (!record) {
      throw new Error400();
    }
    return this._fillWithRelationsAndFiles(record, options);
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
      await options.database.openx_banner.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.openx_banner.count({
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
    let include = [];

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

      ['code', 'noscript'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'openx_banner',
              field,
              filter[field],
            ),
          );
        }
      });

      if (filter.zone) {
        whereAnd.push({
          zone: filter.zone,
        });
      }

      ['activated'].forEach((field) => {
        if (
          filter[field] === true ||
          filter[field] === 'true' ||
          filter[field] === false ||
          filter[field] === 'false'
        ) {
          whereAnd.push({
            [field]:
              filter[field] === true ||
              filter[field] === 'true',
          });
        }
      });
    }

    const where = { [Op.and]: whereAnd };
    let { rows, count } =
      await options.database.openx_banner.findAndCountAll({
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
              'openx_banner',
              'code',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.openx_banner.findAll({
        attributes: ['id', 'code', 'zone'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['id', 'ASC']],
      });

    return records.map((record) => ({
      id: record.id,
      label: record.zone,
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
        entityName: 'openx banner',
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
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(
    record,
    options: IRepositoryOptions,
  ) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    const transaction =
      SequelizeRepository.getTransaction(options);

    return output;
  }
}

export default OpenxRepository;
