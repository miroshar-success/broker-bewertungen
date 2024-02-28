import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import BlogRepository from '../database/repositories/blogRepository';
import BlogBrokerRepository from '../database/repositories/blogBrokerRepository';
import BrokerRepository from '../database/repositories/brokerRepository';

export default class BlogService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async _withRelatedData(data, transaction) {
    const options = { ...this.options, transaction };
    return {
      ...data,
      brokers: await BrokerRepository.filterIdInTenant(
        data.brokers,
        options,
      ),
    };
  }

  async _updateBlogBroker(id, data, transaction) {
    const options = { ...this.options, transaction };
    await BlogBrokerRepository.destroyByBlog(id, options);
    const items = data.brokers || [];
    for (const item of items) {
      await BlogBrokerRepository.create(
        {
          broker_id: item.id,
          blog_entry_id: id,
        },
        options,
      );
    }
  }

  async _updateRelatedData(id, data, transaction) {
    await this._updateBlogBroker(id, data, transaction);
  }

  async create(data) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const record = await BlogRepository.create(
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
        'blog',
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
      const record = await BlogRepository.update(id, data, {
        ...this.options,
        transaction,
      });

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
        'blog',
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
        await BlogRepository.destroy(id, {
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
    return BlogRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return BlogRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return BlogRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async findBlogList(args) {
    return BlogRepository.findBlogList(args, this.options);
  }

  async findByURL(url) {
    return BlogRepository.findByURL(url, this.options);
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
    const count = await BlogRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
