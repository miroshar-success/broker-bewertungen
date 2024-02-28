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

class BrokerCheckboxRepository {
  static ALL_FIELDS = [
    'trade_platform',
    'free_demo_account',
    'metatrader_4',
    'metatrader_5',
    'web_platform',
    'mobile_trading_apps',
    'hedging_allowed',
    'additional_trade_tools',
    'automated_trade_possible',
    'api_interfaces',
    'social_trading',
    'rate_alarms',
    'platform_tutorials',
    'layout_saveable',
    'one_click_trading',
    'trade_from_chart',
    'all_positions_closeable',
    'guaranteed_stops',
    'phone_trade_possible',
    'commissions',
    'important_market_spreads',
    'cost_for_overnight',
    'fees_for_deposit_disbursal',
    'free_orderchange',
    'free_depot',
    'no_platform_fees',
    'german_support',
    'contact',
    'daily_trade_help',
    'german_webinar',
    'german_seminar',
    'coachings_available',
    'knowledge_base',
    'tradeable_markets',
    'margin',
    'managed_accounts',
    'instant_execution',
    'positive_slippage_possible',
    'ecn_order_execution',
    'liquidity_prodiver',
    'micro_lots',
    'index_cfd_tradeable_below_point',
    'rate_switch_24_5_index_cfd',
    'no_financial_cost_index_cfd',
    'no_financial_cost_raw_material_cfd',
    'cfd_contracts_automatic_roll',
    'real_stocks_cfd_spreads',
    'dma_stocks',
    'minimal_ordersize_stocks',
    'company',
    'office_in_germany',
    'bonus',
    'regulation_and_deposit_security',
    'reserve_liabiliry',
    'interest_on_deposit',
    'witholding_tax',
    'segregated_accounts',
    'account_currencies',
    'posibilities_for_withdrawals',
  ];

  static DATA_PREFIX = 'checkbox_';

  static PREFIX_TEXT = 'text_';

  static IMAGE_TYPES = ['NONE', 'PRO', 'CONTRA'];

  static FIELD_SEPARATOR = '||';
  static DATA_SEPARATOR = ';;';

  static _textToArray(value) {
    return (value || '')
      .split(this.DATA_SEPARATOR)
      .map((fields) => {
        const [text, url] = fields.split(
          this.FIELD_SEPARATOR,
        );
        return {
          text: text || '',
          url: url || '',
        };
      });
  }

  static _arrayToText(value) {
    return (value || [])
      .map(({ text, url }) =>
        [text, url]
          .filter(Boolean)
          .join(this.FIELD_SEPARATOR),
      )
      .join(this.DATA_SEPARATOR);
  }

  static _getImageTypeIndex(type) {
    return SequelizeArrayUtils.valueToIndex(
      type,
      this.IMAGE_TYPES,
    );
  }

  static _relatedData(data) {
    const result = {};
    this.ALL_FIELDS.forEach((field) => {
      const textField = `${this.PREFIX_TEXT}${field}`;
      result[field] = this._getImageTypeIndex(
        data[`${this.DATA_PREFIX}${field}`],
      );
      result[textField] = this._arrayToText(
        data[`${this.DATA_PREFIX}${textField}`],
      );
    });
    return result;
  }

  static includes(options: IRepositoryOptions) {
    return [];
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.broker_checkbox.create(
        {
          ...lodash.pick(data, ['id']),
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
      await options.database.broker_checkbox.findOne({
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
      await options.database.broker_checkbox.findOne({
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

    await options.database.broker_checkbox.destroy({
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
      await options.database.broker_checkbox.findOne({
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
      await options.database.broker_checkbox.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.broker_checkbox.count({
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
              'broker_checkbox',
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
      await options.database.broker_checkbox.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderBy.split('_')]
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
        entityName: 'broker_checkbox',
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

export default BrokerCheckboxRepository;
