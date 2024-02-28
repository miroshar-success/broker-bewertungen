import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import moment from 'moment';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

const Op = Sequelize.Op;

class BrokerMetaRepository {
  static ALL_FIELDS = [
    'id',
    'homepage',
    'homepage_title',
    'homepage_impression',
    'broker_type',
    'description',
    'teaser',
    'demo_url',
    'account_url',
    'maximum_leverage',
    'minimum_deposit',
    'minimum_deposit_short',
    'custodian_fees',
    'mobile_trading',
    'phone_order',
    'licensed_broker',
    'withholding_tax',
    'scalping_allowed',
  ];

  static BROKER_TYPES = [
    null,
    'ECN',
    'MT4',
    'MM',
    'ECN_AND_MT4',
    'MM_AND_MT4',
    'DMA',
    'STP',
    'STP_AND_MT4',
    'MARKET_MAKER_AND_STP',
    'BITCOIN_EXCHANGE',
  ];

  static WITHHOLDING_TAXES = [
    null,
    'WITHHOLDING_TAX_1',
    'WITHHOLDING_TAX_2',
  ];

  static _getBrokerTypeIndex(type) {
    return SequelizeArrayUtils.valueToIndex(
      type,
      this.BROKER_TYPES,
    );
  }

  static _getWithHoldingTax(type) {
    return SequelizeArrayUtils.valueToIndex(
      type,
      this.WITHHOLDING_TAXES,
    );
  }

  static _relatedData(data) {
    return {
      homepage: data.homepage ?? '',
      demo_url: data.demo_url ?? '',
      account_url: data.account_url ?? '',
      maximum_leverage: data.maximum_leverage ?? '',
      minimum_deposit_short:
        data.minimum_deposit_short ?? '',
      withholding_tax: this._getWithHoldingTax(
        data.withholding_tax,
      ),
      broker_type: this._getBrokerTypeIndex(
        data.broker_type,
      ),
    };
  }

  static includes(options: IRepositoryOptions) {
    return [];
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.broker_metas.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data),
          ip: data.ip ?? '',
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
      await options.database.broker_metas.findOne({
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
        ip: data.ip ?? '',
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
      await options.database.broker_metas.findOne({
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

  static async destroyByBroker(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.broker_metas.destroy({
      where: {
        id: id,
      },
      transaction,
    });
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = this.includes(options);

    const record =
      await options.database.broker_metas.findOne({
        where: {
          id,
        },
        include,
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
      await options.database.broker_metas.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.broker_metas.count({
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
    let include = this.includes(options);

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

      [].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'broker_metas',
              field,
              filter[field],
            ),
          );
        }
      });

      [].forEach((field) => {
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
      await options.database.broker_metas.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderBy.split('_')]
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
        entityName: 'broker_metas',
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

export default BrokerMetaRepository;
