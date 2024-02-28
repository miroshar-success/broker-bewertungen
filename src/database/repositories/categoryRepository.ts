import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import CategoryDescriptionRepository from './categoryDescriptionRepository';
import { orderByUtils } from '../utils/orderByUtils';
import AuthorRepository from './authorRepository';
import BrokerRepository from './brokerRepository';
import BrokersCategoryRepository from './brokersCategoryRepository';
import { safeURL } from '../utils/stringUtils';

const Op = Sequelize.Op;

class CategoryRepository {
  static ALL_FIELDS = [
    'name',
    'link',
    'title',
    'author_id',
    'target',
    'sort',
    'activated',
    'show_in_navigation',
    'show_in_footer',
  ];

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record = await options.database.category.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        target: data.target ?? '',
        author_id: data.author ?? null,
        ip: '',
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

    let record = await options.database.category.findOne({
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
        target: data.target ?? '',
        author_id: data.author ?? null,
        ip: '',
      },
      {
        transaction,
      },
    );

    if (record) {
      await CategoryDescriptionRepository.update(
        id,
        data,
        options,
      );
    }

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

    await CategoryDescriptionRepository.destroy(
      id,
      options,
    );

    let record = await options.database.category.findOne({
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
    const include = [
      {
        model: options.database.author,
        as: 'author',
      },
    ];
    const record = await options.database.category.findOne({
      where: {
        id,
      },
      include,
      transaction,
    });

    const description_record =
      await options.database.category_description.findOne({
        where: {
          id,
        },
        transaction,
      });
    record.dataValues = {
      ...record.dataValues,
      teaser: description_record.teaser,
      description: description_record.description,
    };

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async findByURL(url, options: IRepositoryOptions) {
    const safeUrl = safeURL(url);

    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = [
      {
        model: options.database.author,
        as: 'author',
        include: {
          model: options.database.file,
          as: 'author_image',
          separate: true,
        },
      },
    ];

    const record = await options.database.category.findOne({
      where: {
        link: safeUrl,
        activated: true,
      },
      include,
      transaction,
    });

    const whereAnd: Array<any> = [{ activated: true }];

    if (record) {
      whereAnd.push({
        id: {
          [Op.in]:
            await BrokersCategoryRepository.filterBrokerIdsByCatId(
              record.id,
              options,
            ),
        },
      });
    }

    const where = { [Op.and]: whereAnd };

    const count = await BrokerRepository.count(
      where,
      options,
    );

    if (safeUrl === '/broker-vergleich') {
      return {
        count,
      };
    }

    if (!record) {
      return null;
    }

    const { rows: brokers } =
      await BrokersCategoryRepository.findAndCountAll(
        {
          filter: {
            category_id: record.id,
            show_in_top_listings: true,
          },
        },
        options,
      );

    const { rows: topBrokers } =
      await BrokerRepository.findAndCountAll(
        {
          filter: {
            ids: brokers.map((broker) => broker.broker_id),
            activated: true,
            top_broker: true,
          },
          orderBy: 'broker_rating.overall_rating_desc',
        },
        options,
      );

    record.dataValues.topBrokers = topBrokers;

    const description_record =
      await options.database.category_description.findOne({
        where: {
          id: record.id,
        },
        transaction,
      });

    record.dataValues.count = count;

    record.dataValues = {
      ...record.dataValues,
      teaser: description_record?.teaser,
      description: description_record?.description,
    };

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

    const records = await options.database.category.findAll(
      {
        attributes: ['id'],
        where,
      },
    );

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.category.count({
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
    const include = [
      {
        model: options.database.author,
        as: 'author',
      },
    ];
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

      [
        'name',
        'link',
        'title',
        'target',
        'author_name',
        'author_link',
      ].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'category',
              field,
              filter[field],
            ),
          );
        }
      });

      if (filter.author) {
        if (
          filter.author !== undefined &&
          filter.author !== null &&
          filter.author !== ''
        ) {
          whereAnd.push({
            author_id: filter.author.id,
          });
        }
      }

      [
        'activated',
        'show_in_navigation',
        'show_in_footer',
      ].forEach((field) => {
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
      await options.database.category.findAndCountAll({
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
              'category',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.category.findAll(
      {
        attributes: ['id', 'name'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['name', 'ASC']],
      },
    );

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
        entityName: 'category',
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

export default CategoryRepository;
