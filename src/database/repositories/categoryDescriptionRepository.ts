import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import { orderByUtils } from '../utils/orderByUtils';

const Op = Sequelize.Op;

class CategoryDescriptionRepository {
  static ALL_FIELDS = ['teaser', 'description'];

  static async create(
    created_id,
    data,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.category_description.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          id: created_id,
          ip: '',
        },
        {
          transaction,
        },
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
      await options.database.category_description.findOne({
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
        ip: '',
      },
      {
        transaction,
      },
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record =
      await options.database.category_description.findOne({
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
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.category_description.findOne({
        where: {
          id,
        },
        transaction,
      });

    if (!record) {
      throw new Error404();
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
      await options.database.category_description.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.category_description.count({
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

      ['teaser', 'description'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'category_description',
              field,
              filter[field],
            ),
          );
        }
      });
    }

    const where = { [Op.and]: whereAnd };

    let { rows, count } =
      await options.database.category_description.findAndCountAll(
        {
          where,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderByUtils(orderBy, options)]
            : [['id', 'DESC']],
          transaction:
            SequelizeRepository.getTransaction(options),
        },
      );

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
              'category_description',
              'description',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.category_description.findAll({
        attributes: ['id', 'description'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['id', 'ASC']],
      });

    return records.map((record) => ({
      id: record.id,
    }));
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

export default CategoryDescriptionRepository;
