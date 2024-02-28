import { IServiceOptions } from './IServiceOptions';
import AuthorRepository from '../database/repositories/authorRepository';
import BrokerArticleRepository from '../database/repositories/brokerArticleRepository';
import BrokerRepository from '../database/repositories/brokerRepository';
import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';

export default class BrokerArticleService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async create(data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      data.broker = await BrokerRepository.filterIdInTenant(
        data.broker,
        { ...this.options, transaction },
      );

      data.author = await AuthorRepository.filterIdInTenant(
        data.author,
        { ...this.options, transaction },
      );

      const record = await BrokerArticleRepository.create(
        data,
        {
          ...this.options,
          transaction,
        },
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
        'broker_article',
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
      data.broker = await BrokerRepository.filterIdInTenant(
        data.broker,
        { ...this.options, transaction },
      );

      data.author = await AuthorRepository.filterIdInTenant(
        data.author,
        { ...this.options, transaction },
      );

      const record = await BrokerArticleRepository.update(
        id,
        data,
        {
          ...this.options,
          transaction,
        },
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
        'broker_article',
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
        await BrokerArticleRepository.destroy(id, {
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
    return await BrokerArticleRepository.findById(
      id,
      this.options,
    );
  }

  async findByURL(url) {
    return await BrokerArticleRepository.findByURL(
      url,
      this.options,
    );
  }

  async findAllAutocomplete(search, limit) {
    return await BrokerArticleRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return await BrokerArticleRepository.findAndCountAll(
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

    return await this.create(dataToCreate);
  }

  async _isImportHashExistent(importHash) {
    const count = await BrokerArticleRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
