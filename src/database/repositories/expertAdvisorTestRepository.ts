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
import ExpertAdvisorTestMetaRepository from './expertAdvisorTestMetaRepository';
import slug from 'slug';

const Op = Sequelize.Op;

class ExpertAdvisorTestRepository {
  static ALL_FIELDS = [
    'id',
    'name',
    'deposit',
    'activated',
    'start_date',
    'pdf',
  ];

  static _relatedData(data) {
    return {
      id: data.id,
      navigation_id: data.navigation
        ? data.navigation.id
        : null,
      broker_id: data.broker ? data.broker.id : null,
      name_normalized: slug(data.name || ''),
      ip: '',
      created: moment.now(),
      modified: moment.now(),
    };
  }

  static async _replaceRelationFiles(
    record,
    data,
    options: IRepositoryOptions,
  ) {
    await FileRepository.replaceRelationFiles(
      {
        belongsTo:
          options.database.expert_advisor_test.getTableName(),
        belongsToColumn: 'expert_advisor_test_image',
        belongsToId: record.id,
      },
      data.expert_advisor_test_image.map((v) => ({
        ...v,
        new: true,
      })),
      options,
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    const record =
      await options.database.expert_advisor_test.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data),
        },
        {
          transaction,
        },
      );

    if (data.expert_advisor_test_image) {
      await this._replaceRelationFiles(
        record,
        data,
        options,
      );
    }
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
      await options.database.expert_advisor_test.findOne({
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

    await this._replaceRelationFiles(record, data, options);

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
      await options.database.expert_advisor_test.findOne({
        where: {
          id,
        },
        transaction,
      });

    if (!record) {
      throw new Error404();
    }

    await ExpertAdvisorTestMetaRepository.destroyByExpertAdvisorTest(
      id,
      options,
    );

    await FileRepository.destroy(
      {
        belongsTo:
          options.database.expert_advisor_test.getTableName(),
        belongsToId: id,
      },
      options,
    );

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
        model: options.database.broker,
        as: 'broker',
      },
      {
        model: options.database.navigation,
        as: 'navigation',
      },
    ];

    const record =
      await options.database.expert_advisor_test.findOne({
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
      await options.database.expert_advisor_test.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.expert_advisor_test.count({
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
    const include = [
      {
        model: options.database.broker,
        as: 'broker',
      },
      {
        model: options.database.navigation,
        as: 'navigation',
      },
      {
        model: options.database.expert_advisor_test_metas,
        as: 'expert_advisor_test_metas',
      },
    ];
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

      if (filter.broker) {
        if (
          filter.broker !== undefined &&
          filter.broker !== null &&
          filter.broker !== ''
        ) {
          whereAnd.push({
            broker_id: filter.broker.id,
          });
        }
      }

      if (filter.navigation) {
        if (
          filter.navigation !== undefined &&
          filter.navigation !== null &&
          filter.navigation !== ''
        ) {
          whereAnd.push({
            navigation_id: filter.navigation.id,
          });
        }
      }

      ['name', 'deposit'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'expert_advisor_test',
              field,
              filter[field],
            ),
          );
        }
      });

      ['activated', 'pdf'].forEach((field) => {
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
      await options.database.expert_advisor_test.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderByUtils(orderBy, options)]
            : [['name', 'ASC']],
          transaction:
            SequelizeRepository.getTransaction(options),
        },
      );

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
              'expert_advisor_test',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.expert_advisor_test.findAll({
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
        entityName: 'expert_advisor_test',
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
    const expertParam = {
      filter: {
        id: output.id,
      },
    };
    const transaction =
      SequelizeRepository.getTransaction(options);

    output.expert_advisor_test_image =
      await FileRepository.fillDownloadUrl(
        await record.getExpert_advisor_test_image({
          transaction,
        }),
      );
    const { rows: expert_advisor_test_metas } =
      await ExpertAdvisorTestMetaRepository.findAndCountAll(
        expertParam,
        options,
      );

    output.expert_advisor_test_metas =
      expert_advisor_test_metas || null;
    return output;
  }
}

export default ExpertAdvisorTestRepository;
