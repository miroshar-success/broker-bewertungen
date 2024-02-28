import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import ExpertAdvisorTestRepository from '../database/repositories/expertAdvisorTestRepository';
import ExpertAdvisorTestMetaRepository from '../database/repositories/expertAdvisorTestMetaRepository';

export default class ExpertAdvisorTestService {
  options: IServiceOptions;

  constructor(options) {
    this.options = options;
  }

  async _withRelatedData(data, transaction) {
    const options = { ...this.options, transaction };
    return {
      ...data,
    };
  }

  async _updateExpertAdvisorTestMeta(
    id,
    data,
    transaction,
  ) {
    const options = { ...this.options, transaction };
    await ExpertAdvisorTestMetaRepository.destroyByExpertAdvisorTest(
      id,
      options,
    );
    await ExpertAdvisorTestMetaRepository.create(
      data,
      options,
    );
  }

  async _updateRelatedData(id, data, transaction) {
    await this._updateExpertAdvisorTestMeta(
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
      const record =
        await ExpertAdvisorTestRepository.create(
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
        'expert_advisor_test',
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
      const record =
        await ExpertAdvisorTestRepository.update(id, data, {
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
        'expert_advisor_test',
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
        await ExpertAdvisorTestRepository.destroy(id, {
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
    return ExpertAdvisorTestRepository.findById(
      id,
      this.options,
    );
  }

  async findAllAutocomplete(
    search,
    limit,
    withChildren = false,
  ) {
    return ExpertAdvisorTestRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return ExpertAdvisorTestRepository.findAndCountAll(
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
    const count = await ExpertAdvisorTestRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
