import { IRepositoryOptions } from './IRepositoryOptions';
import { orderByUtils } from '../utils/orderByUtils';
import AuditLogRepository from './auditLogRepository';
import AuthorRepository from './authorRepository';
import BrokerAddressRepository from './brokerAddressRepository';
import BrokerArticleRepository from './brokerArticleRepository';
import BrokerBankRepository from './brokerBankRepository';
import BrokerCertificateRepository from './brokerCertificateRepository';
import BrokerCheckboxRepository from './brokerCheckboxRepository';
import BrokerCreteriaRepository from './brokerCreteriaRepository';
import BrokerCurrencyPairRepository from './brokerCurrencyPairRepository';
import BrokerDepositGuaranteeRepository from './brokerDepositGuaranteeRepository';
import BrokerDepositRepository from './brokerDepositRepository';
import BrokerEmailRepository from './brokerEmailRepository';
import BrokerFaxRepository from './brokerFaxRepository';
import BrokerFeatureRepository from './brokerFeatureRepository';
import BrokerForexSignalRepository from './brokerForexSignalRepository';
import BrokerMetaRepository from './brokerMetaRepository';
import BrokerMinimumTradingUnitRepository from './brokerMinimumTradingUnitRepository';
import BrokerOrderTypeRepository from './brokerOrderTypeRepository';
import BrokerPhoneRepository from './brokerPhoneRepository';
import BrokerRegulatoryAuthorityRepository from './brokerRegulatoryAuthorityRepository';
import BrokersCategoryRepository from './brokersCategoryRepository';
import BrokerSpreadRepository from './brokerSpreadRepository';
import BrokerTradePlatformRepository from './brokerTradePlatformRepository';
import BrokerTradeStoreRepository from './brokerTradeStoreRepository';
import BrokerUpsideRepository from './brokerUpsideRepository';
import BrokerVideoRepository from './brokerVideoRepository';
import Error404 from '../../errors/Error404';
import FileRepository from './fileRepository';
import lodash from 'lodash';
import moment from 'moment';
import Sequelize from 'sequelize';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import SequelizeRepository from './sequelizeRepository';
import BlogRepository from './blogRepository';
import { safeURL } from '../utils/stringUtils';

const Op = Sequelize.Op;

class BrokerRepository {
  static ALL_FIELDS = [
    'name',
    'name_normalized',
    'activated',
    'is_broker',
    'is_compareable',
    'top_broker',
    'top_binary_broker',
    'top_forex_broker',
    'featured_broker',
    'pdf',
    'author_name',
    'author_link',
  ];

  static FOREX_SIGNALE = '/forex-signale-vergleich';
  static EXPERT_ADVISOR = '/expert-advisors-vergleich';

  static _relatedData(data) {
    return {
      navigation_id: data.navigation || null,
      author_id: data.author || null,
    };
  }

  static includes(
    options: IRepositoryOptions,
    metaOnly = false,
  ) {
    return [
      {
        model: options.database.broker_metas,
        as: 'meta',
      },
      {
        model: options.database.broker_rating,
        as: 'rating',
      },
      !metaOnly && {
        model: options.database.navigation,
        as: 'navigation',
      },
      !metaOnly && {
        model: options.database.author,
        as: 'author',
      },
      !metaOnly && {
        model: options.database.broker_phone,
        as: 'phone',
      },
      !metaOnly && {
        model: options.database.broker_fax,
        as: 'fax',
      },
      !metaOnly && {
        model: options.database.broker_email,
        as: 'email',
      },
      !metaOnly && {
        model: options.database.broker_address,
        as: 'address',
      },
      !metaOnly && {
        model: options.database.broker_video,
        as: 'video',
      },
      !metaOnly && {
        model: options.database.broker_checkbox,
        as: 'checkbox',
      },
      !metaOnly && {
        model: options.database.broker_creterias,
        as: 'creteria',
      },
      !metaOnly && {
        model: options.database.broker_forex_signal,
        as: 'forex_signal',
      },
    ].filter(Boolean);
  }

  static async _replaceRelationFiles(
    record,
    data,
    options: IRepositoryOptions,
  ) {
    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.broker.getTableName(),
        belongsToColumn: 'broker_image_top_broker_logo',
        belongsToId: record.id,
      },
      data.broker_image_top_broker_logo.map((v) => ({
        ...v,
        type: 'top_broker_logo',
      })),
      options,
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.broker.getTableName(),
        belongsToColumn:
          'broker_image_top_broker_horizontal_logo',
        belongsToId: record.id,
      },
      data.broker_image_top_broker_horizontal_logo.map(
        (v) => ({
          ...v,
          type: 'top_broker_horizontal_logo',
        }),
      ),
      options,
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.broker.getTableName(),
        belongsToColumn:
          'broker_image_broker_regulation_image',
        belongsToId: record.id,
      },
      data.broker_image_broker_regulation_image.map(
        (v) => ({
          ...v,
          type: 'broker_regulation_image',
        }),
      ),
      options,
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.broker.getTableName(),
        belongsToColumn: 'broker_image_broker_logo',
        belongsToId: record.id,
      },
      data.broker_image_broker_logo.map((v) => ({
        ...v,
        type: 'broker_logo',
      })),
      options,
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.broker.getTableName(),
        belongsToColumn: 'broker_image_broker_detail_logo',
        belongsToId: record.id,
      },
      data.broker_image_broker_detail_logo.map((v) => ({
        ...v,
        type: 'broker_detail_logo',
      })),
      options,
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record = await options.database.broker.create(
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

    await this._replaceRelationFiles(record, data, options);

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

    let record = await options.database.broker.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    await this._replaceRelationFiles(record, data, options);

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

    let record = await options.database.broker.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    const Repositories: any[] = [
      BrokerAddressRepository,
      BrokerBankRepository,
      BrokerCertificateRepository,
      BrokerCheckboxRepository,
      BrokerCreteriaRepository,
      BrokerCurrencyPairRepository,
      BrokerDepositGuaranteeRepository,
      BrokerDepositRepository,
      BrokerEmailRepository,
      BrokerFaxRepository,
      BrokerFeatureRepository,
      BrokerForexSignalRepository,
      BrokerMetaRepository,
      BrokerMinimumTradingUnitRepository,
      BrokerOrderTypeRepository,
      BrokerPhoneRepository,
      BrokerRegulatoryAuthorityRepository,
      BrokersCategoryRepository,
      BrokerSpreadRepository,
      BrokerTradePlatformRepository,
      BrokerTradeStoreRepository,
      BrokerUpsideRepository,
      BrokerVideoRepository,
    ];
    for (const Repository of Repositories) {
      if (
        typeof Repository.destroyByBroker === 'function'
      ) {
        await Repository.destroyByBroker(id, options);
      }
    }

    await FileRepository.destroy(
      {
        belongsTo: options.database.broker.getTableName(),
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

    const include = this.includes(options);

    const record = await options.database.broker.findOne({
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

  static async findByURL(url, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = this.includes(options);

    const record = await options.database.broker.findOne({
      where: {
        name_normalized: safeURL(url),
        activated: true,
      },
      include,
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    record.dataValues.articles = (
      await BrokerArticleRepository.findAndCountAll(
        {
          filter: {
            broker: record.id,
            activated: true,
          },
        },
        options,
      )
    ).rows.map((row) =>
      lodash.pick(row, ['id', 'name', 'name_normalized']),
    );

    record.dataValues.blogs = (
      await BlogRepository.findAndCountAll(
        {
          filter: {
            broker: record.id,
            activated: true,
          },
        },
        options,
      )
    ).rows.map((row) =>
      lodash.pick(row, ['id', 'name', 'name_normalized']),
    );

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

    const records = await options.database.broker.findAll({
      attributes: ['id'],
      where,
    });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.broker.count({
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
    let include = this.includes(options, true);

    if (filter) {
      if (filter.ids) {
        whereAnd.push({
          id: {
            [Op.in]: filter.ids,
          },
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

      if (filter.category && filter.category != 0) {
        whereAnd.push({
          id: {
            [Op.in]:
              await BrokersCategoryRepository.filterBrokerIdsByCatId(
                filter.category,
                options,
              ),
          },
        });
      }

      if (filter.parent) {
        whereAnd.push({
          ['parent_id']: filter.parent,
        });
      }

      ['name', 'name_normalized'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'broker',
              field,
              filter[field],
            ),
          );
        }
      });

      [
        'activated',
        'is_broker',
        'is_compareable',
        'top_broker',
        'top_binary_broker',
        'top_forex_broker',
        'featured_broker',
        'pdf',
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
      await options.database.broker.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [
              orderByUtils(orderBy, options, {
                broker_rating: 'rating',
              }),
            ]
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
    useLink,
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [
      {
        activated: true,
        is_broker: true,
      },
    ];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: query },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'broker',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records = await options.database.broker.findAll({
      attributes: ['id', 'name', 'name_normalized'],
      where,
      limit: limit ? Number(limit) : undefined,
      order: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: useLink ? record.name_normalized : record.id,
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
        entityName: 'broker',
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
    metaOnly = true,
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

    const transaction =
      SequelizeRepository.getTransaction(options);

    const brokerParam = {
      filter: {
        broker_id: output.id,
      },
    };

    const { rows: categories } =
      await BrokersCategoryRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.categories = categories;

    // #region Images
    output.broker_image_broker_logo =
      await FileRepository.fillDownloadUrl(
        await record.getBroker_image_broker_logo({
          transaction,
        }),
      );

    output.broker_image_broker_detail_logo =
      await FileRepository.fillDownloadUrl(
        await record.getBroker_image_broker_detail_logo({
          transaction,
        }),
      );

    output.broker_image_broker_regulation_image =
      await FileRepository.fillDownloadUrl(
        await record.getBroker_image_broker_regulation_image(
          {
            transaction,
          },
        ),
      );

    output.broker_image_top_broker_logo =
      await FileRepository.fillDownloadUrl(
        await record.getBroker_image_top_broker_logo({
          transaction,
        }),
      );

    output.broker_image_top_broker_horizontal_logo =
      await FileRepository.fillDownloadUrl(
        await record.getBroker_image_top_broker_horizontal_logo(
          {
            transaction,
          },
        ),
      );
    // #endregion

    const { rows: regulatory_authorities } =
      await BrokerRegulatoryAuthorityRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.regulatory_authorities =
      regulatory_authorities || null;

    if (metaOnly) {
      return output;
    }

    const { rows: upsides } =
      await BrokerUpsideRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.upsides = upsides || null;

    const { rows: deposit_guarantees } =
      await BrokerDepositGuaranteeRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.deposit_guarantees = deposit_guarantees || null;

    const { rows: certificates } =
      await BrokerCertificateRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.certificates = certificates || null;

    const { rows: spreads } =
      await BrokerSpreadRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.spreads = spreads || null;

    const { rows: features } =
      await BrokerFeatureRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.features = features || null;

    const { rows: banks } =
      await BrokerBankRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.banks = banks || null;

    const { rows: order_types } =
      await BrokerOrderTypeRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.order_types =
      order_types?.map((val) => val.type) || null;

    const { rows: minimum_trading_units } =
      await BrokerMinimumTradingUnitRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.minimum_trading_units =
      minimum_trading_units?.map(
        (val) => val.minimum_trading_unit,
      ) || null;

    const { rows: currency_pairs } =
      await BrokerCurrencyPairRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.currency_pairs = currency_pairs || null;

    const { rows: trade_platforms } =
      await BrokerTradePlatformRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.trade_platforms = trade_platforms || null;

    const { rows: trade_stores } =
      await BrokerTradeStoreRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.trade_stores = trade_stores || null;

    const { rows: deposits } =
      await BrokerDepositRepository.findAndCountAll(
        brokerParam,
        options,
      );

    output.deposits = deposits || null;

    output.author =
      await AuthorRepository._fillWithRelationsAndFiles(
        record.author,
        options,
      );

    output.forex_signale =
      (output.categories.length === 1 &&
        output.categories[0].category.link ===
          this.FOREX_SIGNALE) ||
      output.navigation.link === this.FOREX_SIGNALE;

    output.expert_advisor =
      (output.categories.length === 1 &&
        output.categories[0].category.link ===
          this.EXPERT_ADVISOR) ||
      output.navigation.link === this.EXPERT_ADVISOR;

    return output;
  }
}

export default BrokerRepository;
