import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import NavigationRepository from '../database/repositories/navigationRepository';
import PageRepositoryEx from '../database/repositories/extends/pageRepositoryEx';

export default class NavigationService {
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
      data.parent =
        await NavigationRepository.filterIdInTenant(
          data.parent,
          { ...this.options, transaction },
        );

      const record = await NavigationRepository.create(
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
        'navigation',
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
      data.parent =
        await NavigationRepository.filterIdInTenant(
          data.parent,
          { ...this.options, transaction },
        );

      const record = await NavigationRepository.update(
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
        'navigation',
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
        await NavigationRepository.destroy(id, {
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
    return await NavigationRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(
    search,
    limit,
    withChildren = false,
    part = null,
    id = null,
  ) {
    let excludes = [0];
    if (part) {
      if (part === 'page') {
        excludes =
          await PageRepositoryEx.filterNavigationIds(
            [id ?? 0],
            this.options,
          );
      }
    }
    return await NavigationRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
      withChildren,
      excludes,
    );
  }

  async findAndCountAll(args) {
    return await NavigationRepository.findAndCountAll(
      args,
      this.options,
    );
  }

  async findForHome() {
    return await NavigationRepository.findForHome(
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
    const count = await NavigationRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
