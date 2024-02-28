import Error400 from '../errors/Error400';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';
import BrokerPostRepository from '../database/repositories/brokerPostRepository';
import EmailSender from './emailSender';
import BrokerRepository from '../database/repositories/brokerRepository';

export default class BrokerPostService {
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
      data.parent_id =
        await BrokerPostRepository.filterIdInTenant(
          data.parent_id,
          { ...this.options, transaction },
        );

      const record = await BrokerPostRepository.create(
        data,
        {
          ...this.options,
          transaction,
        },
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      await this.ratingAll([record.id]);

      if (EmailSender.isConfigured) {
        const broker = await BrokerRepository.findById(
          data.broker_id,
          { ...this.options },
        );
        new EmailSender(
          EmailSender.TEMPLATES.REVIEW_NOTIFICATION,
          {
            subject: `Neue Bewertung zu ${broker?.name}`,
            name: data.name,
            email: data.email,
            rating: data.rating,
            ip: data.ip,
            userAgent: data.user_agent,
            review: data.review,
          },
        ).sendTo(EmailSender.REVIEW_NOTIFICATION_RECIPIENT);
      }

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'brokerPost',
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
      const record = await BrokerPostRepository.update(
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

      await this.ratingAll([id]);

      return record;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        this.options.language,
        'brokerPost',
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
        await BrokerPostRepository.destroy(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      await this.ratingAll(ids);
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async spamAll(ids) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      for (const id of ids) {
        await BrokerPostRepository.spam(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      await this.ratingAll(ids);
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async reviewAll(ids) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      for (const id of ids) {
        await BrokerPostRepository.review(id, {
          ...this.options,
          transaction,
        });
      }

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      await this.ratingAll(ids);
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );
      throw error;
    }
  }

  async ratingAll(ids) {
    const transaction =
      await SequelizeRepository.createTransaction(
        this.options.database,
      );

    try {
      const brokers =
        await BrokerPostRepository.filterBrokerIdsInTenant(
          ids,
          { ...this.options, transaction },
        );
      for (const broker of brokers) {
        await BrokerPostRepository.updateRating(broker, {
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
    return BrokerPostRepository.findById(id, this.options);
  }

  async findAllAutocomplete(search, limit) {
    return BrokerPostRepository.findAllAutocomplete(
      search,
      limit,
      this.options,
    );
  }

  async findAndCountAll(args) {
    return BrokerPostRepository.findAndCountAll(
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
    const count = await BrokerPostRepository.count(
      {
        importHash,
      },
      this.options,
    );

    return count > 0;
  }
}
