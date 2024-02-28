import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import PageRepository from '../database/repositories/pageRepository';
import NavigationRepository from '../database/repositories/navigationRepository';
import PageRelatedLinkRepository from '../database/repositories/pageRelatedLinkRepository';

export default class PageService {
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
    };
  }

  async _updatePageRelatedLink(id, data, transaction) {
    const options = { ...this.options, transaction };
    await PageRelatedLinkRepository.destroyByPage(
      id,
      options,
    );
    const items = data.related_links || [];
    for (const item of items) {
      await PageRelatedLinkRepository.create(
        {
          ...item,
          page_id: id,
          ip: '',
        },
        options,
      );
    }
  }

  async _updateRelatedData(id, data, transaction) {
    await this._updatePageRelatedLink(
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
      const record = await PageRepository.create(
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
        'page',
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
      const record = await PageRepository.update(id, data, {
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
        'page',
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
        await PageRepository.destroy(id, {
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
    return PageRepository.findById(id, this.options);
  }

  async findByURL(url) {
    return PageRepository.findByURL(url, this.options);
  }

  async findAllAutocomplete(
    search,
    limit,
    withChildren = false,
  ) {
    return PageRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return PageRepository.findAndCountAll(
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
    const count = await PageRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
