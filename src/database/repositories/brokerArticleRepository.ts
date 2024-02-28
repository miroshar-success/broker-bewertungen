import { IRepositoryOptions } from './IRepositoryOptions';
import { orderByUtils } from '../utils/orderByUtils';
import AuditLogRepository from './auditLogRepository';
import Error404 from '../../errors/Error404';
import lodash from 'lodash';
import Sequelize from 'sequelize';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import SequelizeRepository from './sequelizeRepository';
import author from '../models/author';
import AuthorRepository from './authorRepository';
import BrokerRepository from './brokerRepository';
import { safeURL } from '../utils/stringUtils';

const Op = Sequelize.Op;

class BrokerArticleRepository {
  static ALL_FIELDS = [
    'broker_id',
    'name',
    'name_normalized',
    'author_id',
    'author_name',
    'author_link',
    'pagetitle',
    'metadescription',
    'metakeywords',
    'activated',
    'content',
  ];

  static _relatedData(data) {
    return {
      broker_id: data.broker ?? null,
      author_id: data.author ?? null,
      ip: data.ip ?? '',
    };
  }

  static includes(
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    return [
      !metaOnly && {
        model: options.database.broker,
        as: 'broker',
      },
      !metaOnly && {
        model: options.database.author,
        as: 'author',
      },
    ].filter(Boolean);
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.broker_article.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data),
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
      await options.database.broker_article.findOne({
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
      await options.database.broker_article.findOne({
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

    const record =
      await options.database.broker_article.findOne({
        where: {
          id,
        },
        include: this.includes(options, false),
        transaction,
      });

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async findByURL(url, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const safeUrl = safeURL(url);

    const els = safeUrl.split(/\//);

    const broker = await BrokerRepository.count(
      { name_normalized: els[1], activated: true },
      options,
    );

    if (!Boolean(broker)) {
      return null;
    }

    const record =
      await options.database.broker_article.findOne({
        where: {
          name_normalized: els[2],
          activated: true,
        },
        include: this.includes(options, false),
        transaction,
      });

    if (
      !record ||
      record.broker.name_normalized !== els[1]
    ) {
      return null;
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
      await options.database.broker_article.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.broker_article.count({
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
      if (filter.broker) {
        whereAnd.push({
          broker_id: filter.broker || 0,
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

      [
        'name',
        'name_normalized',
        'author_name',
        'author_link',
        'pagetitle',
        'metadescription',
        'metakeywords',
      ].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'broker_article',
              field,
              filter[field],
            ),
          );
        }
      });

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
      await options.database.broker_article.findAndCountAll(
        {
          where,
          include: [
            {
              model: options.database.broker,
              as: 'broker',
              attributes: ['id', 'name', 'name_normalized'],
            },
          ],
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
    let whereAnd: Array<any> = [
      {
        ['name']: {
          [Op.ne]: '',
        },
      },
    ];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: query },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'broker_article',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.broker_article.findAll({
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
        entityName: 'broker_article',
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
    output.author =
      await AuthorRepository._fillWithRelationsAndFiles(
        record.author,
        options,
      );
    return output;
  }
}

export default BrokerArticleRepository;
