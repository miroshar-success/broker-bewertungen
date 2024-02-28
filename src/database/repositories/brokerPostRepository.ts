import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import moment from 'moment';
import { orderByUtils } from '../utils/orderByUtils';
const Op = Sequelize.Op;

class BrokerPostRepository {
  static ALL_FIELDS = [
    'name',
    'rating',
    'email',
    'created',
    'review',
  ];

  static _relatedData(data) {
    return {
      ip: '',
      email: data.email || '',
      created: data.created || moment.now(),
      modified: moment.now(),
    };
  }

  static async updateRating(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    await options.database.broker_rating.destroy({
      where: {
        id: id,
      },
      transaction,
    });
    const result =
      await options.database.broker_post.findAll({
        attributes: [
          [
            Sequelize.fn('COUNT', Sequelize.col('id')),
            'overall_reviews',
          ],
          [
            Sequelize.fn(
              'SUM',
              Sequelize.literal('IF(rating > 0, 1, 0)'),
            ),
            'rated_reviews',
          ],
          [
            Sequelize.fn('SUM', Sequelize.col('rating')),
            'sum_rating',
          ],
        ],
        where: {
          broker_id: id,
          parent_id: {
            [Op.is]: null,
          },
          deleted: false,
          spam: false,
          review_required: false,
        },
      });
    const summary = result[0]?.dataValues;
    const rated_reviews = Number(
      summary?.rated_reviews || 0,
    );
    const overall_rating =
      Number(summary?.sum_rating || 0) /
      (rated_reviews || 1);
    await options.database.broker_rating.create(
      {
        id: id,
        overall_rating: overall_rating,
        overall_reviews: summary?.overall_reviews || 0,
        rated_reviews: rated_reviews,
        ip: '',
        created: moment(),
        modified: moment(),
        last_modified: moment(),
      },
      { transaction },
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    const record =
      await options.database.broker_post.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data),
          broker_id: data.broker_id,
          parent_id: data.parent_id || null,
          email: data.email || '',
          review: data.review || '',
          review_required: !Boolean(data.parent_id),
          rating: data.rating || 0,
          created: moment(),
          modified: moment(),
          user_agent: data.user_agent || '',
          ip: data.ip || '',
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

    let record = await options.database.broker_post.findOne(
      {
        where: {
          id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }
    record = await record.update(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
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

    let record = await options.database.broker_post.findOne(
      {
        where: {
          id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        deleted: true,
        modified: moment.now(),
      },
      {
        transaction,
      },
    );

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async spam(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record = await options.database.broker_post.findOne(
      {
        where: {
          id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        spam: true,
        modified: moment.now(),
      },
      {
        transaction,
      },
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      record,
      options,
    );
  }

  static async review(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record = await options.database.broker_post.findOne(
      {
        where: {
          id,
        },
        transaction,
      },
    );

    if (!record) {
      throw new Error404();
    }

    record = await record.update(
      {
        review_required: !record.review_required,
        modified: moment.now(),
      },
      {
        transaction,
      },
    );

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
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
      await options.database.broker_post.findOne({
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
      await options.database.broker_post.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async filterBrokerIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterBrokerIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterBrokerIdsInTenant(
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
      await options.database.broker_post.findAll({
        attributes: [
          Sequelize.fn(
            'DISTINCT',
            Sequelize.col('broker_id'),
          ),
          'broker_id',
        ],
        where,
      });

    return records.map((record) => record.broker_id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.broker_post.count({
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
    let whereAnd: Array<any> = [
      {
        parent_id: {
          [Op.is]: null,
        },
      },
    ];

    if (filter) {
      if (filter.limit) {
        limit = filter.limit;
      }
      if (filter.broker) {
        whereAnd.push({
          broker_id: filter.broker,
        });
      }

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

      ['name', 'email'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'broker_post',
              field,
              filter[field],
            ),
          );
        }
      });

      ['spam', 'deleted', 'review_required'].forEach(
        (field) => {
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
        },
      );
    }

    const where = { [Op.and]: [...whereAnd] };

    whereAnd.shift();

    const include = [
      {
        attributes: ['id', 'name', 'name_normalized'],
        model: options.database.broker,
        as: 'broker',
      },
      {
        attributes: ['id', 'name', 'review', 'deleted'],
        model: options.database.broker_post,
        as: 'children',
        separate: true,
        where: {
          [Op.and]: whereAnd,
        },
      },
    ];

    let { rows, count } =
      await options.database.broker_post.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderByUtils(orderBy, options)]
          : [
              ['modified', 'DESC'],
              ['id', 'DESC'],
            ],
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
              'broker_post',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.broker_post.findAll({
        attributes: ['id', 'name'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['name', 'ASC']],
      });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
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
        entityName: 'broker_post',
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

export default BrokerPostRepository;
