import { IServiceOptions } from './IServiceOptions';
import AuthorRepository from '../database/repositories/authorRepository';
import BrokerAddressRepository from '../database/repositories/brokerAddressRepository';
import BrokerBankRepository from '../database/repositories/brokerBankRepository';
import BrokerCertificateRepository from '../database/repositories/brokerCertificateRepository';
import BrokerCheckboxRepository from '../database/repositories/brokerCheckboxRepository';
import BrokerCreteriaRepository from '../database/repositories/brokerCreteriaRepository';
import BrokerCurrencyPairRepository from '../database/repositories/brokerCurrencyPairRepository';
import BrokerDepositGuaranteeRepository from '../database/repositories/brokerDepositGuaranteeRepository';
import BrokerDepositRepository from '../database/repositories/brokerDepositRepository';
import BrokerEmailRepository from '../database/repositories/brokerEmailRepository';
import BrokerFaxRepository from '../database/repositories/brokerFaxRepository';
import BrokerFeatureRepository from '../database/repositories/brokerFeatureRepository';
import BrokerForexSignalRepository from '../database/repositories/brokerForexSignalRepository';
import BrokerMetaRepository from '../database/repositories/brokerMetaRepository';
import BrokerMinimumTradingUnitRepository from '../database/repositories/brokerMinimumTradingUnitRepository';
import BrokerOrderTypeRepository from '../database/repositories/brokerOrderTypeRepository';
import BrokerPhoneRepository from '../database/repositories/brokerPhoneRepository';
import BrokerRegulatoryAuthorityRepository from '../database/repositories/brokerRegulatoryAuthorityRepository';
import BrokerRepository from '../database/repositories/brokerRepository';
import BrokersCategoryRepository from '../database/repositories/brokersCategoryRepository';
import BrokerSpreadRepository from '../database/repositories/brokerSpreadRepository';
import BrokerTradePlatformRepository from '../database/repositories/brokerTradePlatformRepository';
import BrokerTradeStoreRepository from '../database/repositories/brokerTradeStoreRepository';
import BrokerUpsideRepository from '../database/repositories/brokerUpsideRepository';
import BrokerVideoRepository from '../database/repositories/brokerVideoRepository';
import CategoryRepository from '../database/repositories/categoryRepository';
import Error400 from '../errors/Error400';
import NavigationRepository from '../database/repositories/navigationRepository';
import SequelizeRepository from '../database/repositories/sequelizeRepository';

export default class BrokerService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async _withRelatedData(data, transaction) {
    const options = { ...this.options, transaction };
    return {
      ...data,
      navigation:
        await NavigationRepository.filterIdInTenant(
          data.navigation,
          options,
        ),
      author: await AuthorRepository.filterIdInTenant(
        data.author,
        options,
      ),
    };
  }

  /**
   * ! Update Broker Meta
   */
  async _updateBrokerMeta(id, data, transaction) {
    const options = { ...this.options, transaction };
    const metaId =
      await BrokerMetaRepository.filterIdInTenant(
        id,
        options,
      );
    if (metaId) {
      await BrokerMetaRepository.update(id, data, options);
    } else {
      await BrokerMetaRepository.create(
        {
          ...data,
          id: id,
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Creteria
   */
  async _updateBrokerCreteria(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerCreteriaRepository.destroyByBroker(
      id,
      options,
    );
    const prefix = 'creteria_';
    const creteria = {};
    BrokerCreteriaRepository.ALL_FIELDS.forEach((field) => {
      const realField = `${prefix}${field}`;
      if (data[realField]) {
        creteria[field] = data[realField];
      }
    });
    const items = [creteria].filter(Boolean);
    for (const item of items) {
      await BrokerCreteriaRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker's Categories
   */
  async _updateBrokersCategories(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokersCategoryRepository.destroyByBroker(
      id,
      options,
    );
    const categories_in_top_lists =
      data.categories_in_top_lists || [];
    const items = data.categories || [];
    for (const category of items) {
      await BrokersCategoryRepository.create(
        {
          broker: id,
          category:
            await CategoryRepository.filterIdInTenant(
              category,
              options,
            ),
          show_in_top_listings:
            categories_in_top_lists.includes(category),
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Upside
   */
  async _updateBrokerUpside(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerUpsideRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.upsides || [];
    for (const item of items) {
      await BrokerUpsideRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Currency Pair
   */
  async _updateBrokerCurrencyPair(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerCurrencyPairRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.currency_pairs || [];
    for (const item of items) {
      await BrokerCurrencyPairRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Trade Platform
   */
  async _updateBrokerTradePlatform(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerTradePlatformRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.trade_platforms || [];
    for (const item of items) {
      await BrokerTradePlatformRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Trade Store
   */
  async _updateBrokerTradeStore(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerTradeStoreRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.trade_stores || [];
    for (const item of items) {
      await BrokerTradeStoreRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Deposit
   */
  async _updateBrokerDeposit(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerDepositRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.deposits || [];
    for (const item of items) {
      await BrokerDepositRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Regulatory Authority
   */
  async _updateBrokerRegulatoryAuthority(
    id,
    data,
    transaction,
  ) {
    const options = { ...this.options, transaction };
    await BrokerRegulatoryAuthorityRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.regulatory_authorities || [];
    for (const item of items) {
      await BrokerRegulatoryAuthorityRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Deposit Guarantee
   */
  async _updateBrokerDepositGuarantee(
    id,
    data,
    transaction,
  ) {
    const options = { ...this.options, transaction };
    await BrokerDepositGuaranteeRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.deposit_guarantees || [];
    for (const item of items) {
      await BrokerDepositGuaranteeRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Order Type
   */
  async _updateBrokerOrderType(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerOrderTypeRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.order_types || [];
    for (const item of items) {
      await BrokerOrderTypeRepository.create(
        {
          type: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Minimum Trading Unit
   */
  async _updateBrokerMinimumTradingUnit(
    id,
    data,
    transaction,
  ) {
    const options = { ...this.options, transaction };
    await BrokerMinimumTradingUnitRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.minimum_trading_units || [];
    for (const item of items) {
      await BrokerMinimumTradingUnitRepository.create(
        {
          minimum_trading_unit: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Certificate
   */
  async _updateBrokerCertificate(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerCertificateRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.certificates || [];
    for (const item of items) {
      await BrokerCertificateRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Spread
   */
  async _updateBrokerSpread(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerSpreadRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.spreads || [];
    for (const item of items) {
      await BrokerSpreadRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Feature
   */
  async _updateBrokerFeature(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerFeatureRepository.destroyByBroker(
      id,
      options,
    );
    const items = data.features || [];
    for (const item of items) {
      await BrokerFeatureRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Bank
   */
  async _updateBrokerBank(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerBankRepository.destroyByBroker(id, options);
    const items = data.banks || [];
    for (const item of items) {
      await BrokerBankRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Phone
   */
  async _updateBrokerPhone(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerPhoneRepository.destroyByBroker(
      id,
      options,
    );
    const items = [data.phone].filter(Boolean);
    for (const item of items) {
      await BrokerPhoneRepository.create(
        {
          phone: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Fax
   */
  async _updateBrokerFax(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerFaxRepository.destroyByBroker(id, options);
    const items = [data.fax].filter(Boolean);
    for (const item of items) {
      await BrokerFaxRepository.create(
        {
          fax: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Email
   */
  async _updateBrokerEmail(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerEmailRepository.destroyByBroker(
      id,
      options,
    );
    const items = [data.email].filter(Boolean);
    for (const item of items) {
      await BrokerEmailRepository.create(
        {
          email: item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Address
   */
  async _updateBrokerAddress(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BrokerAddressRepository.destroyByBroker(
      id,
      options,
    );
    const prefix = 'address_';
    const address = {};
    BrokerAddressRepository.ALL_FIELDS.forEach((field) => {
      const realField = `${prefix}${field}`;
      if (data[realField]) {
        address[field] = data[realField];
      }
    });
    const items = [address].filter(Boolean);
    for (const item of items) {
      await BrokerAddressRepository.create(
        {
          ...item,
          broker: id,
          ip: data.ip || '',
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Video
   */
  async _updateBrokerVideo(id, data, transaction) {
    const options = { ...this.options, transaction };
    const videoId =
      await BrokerVideoRepository.filterIdInTenant(
        id,
        options,
      );
    if (videoId) {
      await BrokerVideoRepository.update(id, data, options);
    } else {
      await BrokerVideoRepository.create(
        {
          ...data,
          id: id,
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Checkbox
   */
  async _updateBrokerCheckbox(id, data, transaction) {
    const options = { ...this.options, transaction };
    const checkboxId =
      await BrokerCheckboxRepository.filterIdInTenant(
        id,
        options,
      );
    if (checkboxId) {
      await BrokerCheckboxRepository.update(
        id,
        data,
        options,
      );
    } else {
      await BrokerCheckboxRepository.create(
        {
          ...data,
          id: id,
        },
        options,
      );
    }
  }

  /**
   * ! Update Broker Forex Signal
   */
  async _updateBrokerForexSignal(id, data, transaction) {
    const options = { ...this.options, transaction };
    const forexSignalId =
      await BrokerForexSignalRepository.filterIdInTenant(
        id,
        options,
      );
    if (forexSignalId) {
      await BrokerForexSignalRepository.update(
        id,
        data,
        options,
      );
    } else {
      await BrokerForexSignalRepository.create(
        {
          ...data,
          id: id,
        },
        options,
      );
    }
  }

  /**
   * * Update Related Broker's Data
   */
  async _updateRelatedData(id, data, transaction) {
    await this._updateBrokerMeta(id, data, transaction);
    await this._updateBrokersCategories(
      id,
      data,
      transaction,
    );
    await this._updateBrokerUpside(id, data, transaction);
    await this._updateBrokerRegulatoryAuthority(
      id,
      data,
      transaction,
    );
    await this._updateBrokerDepositGuarantee(
      id,
      data,
      transaction,
    );
    await this._updateBrokerCertificate(
      id,
      data,
      transaction,
    );
    await this._updateBrokerSpread(id, data, transaction);
    await this._updateBrokerCreteria(id, data, transaction);
    await this._updateBrokerFeature(id, data, transaction);
    await this._updateBrokerPhone(id, data, transaction);
    await this._updateBrokerFax(id, data, transaction);
    await this._updateBrokerEmail(id, data, transaction);
    await this._updateBrokerAddress(id, data, transaction);
    await this._updateBrokerVideo(id, data, transaction);
    await this._updateBrokerCheckbox(id, data, transaction);
    await this._updateBrokerBank(id, data, transaction);
    await this._updateBrokerOrderType(
      id,
      data,
      transaction,
    );
    await this._updateBrokerMinimumTradingUnit(
      id,
      data,
      transaction,
    );
    await this._updateBrokerCurrencyPair(
      id,
      data,
      transaction,
    );
    await this._updateBrokerTradePlatform(
      id,
      data,
      transaction,
    );
    await this._updateBrokerTradeStore(
      id,
      data,
      transaction,
    );
    await this._updateBrokerDeposit(id, data, transaction);
    await this._updateBrokerForexSignal(
      id,
      data,
      transaction,
    );
  }

  async create(data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const record = await BrokerRepository.create(
        await this._withRelatedData(data, transaction),
        {
          ...this.options,
          transaction,
        },
      );

      await this._updateRelatedData(
        record.id,
        data,
        transaction,
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'broker',
      );

      throw error;
    }
  }

  async update(id, data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const record = await BrokerRepository.update(
        id,
        await this._withRelatedData(data, transaction),
        {
          ...this.options,
          transaction,
        },
      );

      await this._updateRelatedData(
        record.id,
        data,
        transaction,
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'broker',
      );

      throw error;
    }
  }

  async destroyAll(ids) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      for (const id of ids) {
        await BrokerRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async findById(id) {
    return await BrokerRepository.findById(
      id,
      this.options,
    );
  }

  async findByURL(url) {
    return await BrokerRepository.findByURL(
      url,
      this.options,
    );
  }

  async findAllAutocomplete(
    search,
    limit,
    useLink = false,
  ) {
    return await BrokerRepository.findAllAutocomplete(
      search,
      limit,
      useLink,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return await BrokerRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async import(data, importHash) {
    if (!importHash) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashRequired',
      );
    }

    if (await this._isImportHashExistent(importHash)) {
      throw new Error400(
        this.options.language,
        'importer.errors.importHashExistent',
      );
    }

    const dataToCreate = {
      ...data,
      importHash,
    };

    return this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await BrokerRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
