import lodash from 'lodash';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import SequelizeRepository from './sequelizeRepository';

const Op = Sequelize.Op;

class BrokersCategoryRepository {
  static ALL_FIELDS = ['show_in_top_listings'];

  static _relatedData(data) {
    return {
      show_in_top_listings:
        data.show_in_top_listings || false,
      broker_id: data.broker || null,
      category_id: data.category || null,
    };
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.brokers_category.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
      },
      {
        transaction,
      },
    );
  }

  static async destroyByBroker(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.brokers_category.destroy({
      where: {
        broker_id: id,
      },
      transaction,
    });
  }

  static async destroyByCategory(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.brokers_category.destroy({
      where: {
        category_id: id,
      },
      transaction,
    });
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    const include = [
      {
        model: options.database.category,
        as: 'category',
      },
    ];

    if (filter) {
      ['broker_id', 'category_id'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push({
            [field]: filter[field],
          });
        }
      });

      ['show_in_top_listings'].forEach((field) => {
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
      await options.database.brokers_category.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderBy.split('_')]
            : [
                ['broker_id', 'ASC'],
                ['category_id', 'ASC'],
              ],
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

  static async filterBrokerIdsByCatId(
    category_id,
    options: IRepositoryOptions,
  ) {
    const records =
      await options.database.brokers_category.findAll({
        attributes: [
          [
            Sequelize.fn(
              'DISTINCT',
              Sequelize.col('broker_id'),
            ),
            'id',
          ],
        ],
        where: {
          category_id,
        },
      });
    return records.map(
      (record) => record.id || record.dataValues.id,
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

export default BrokersCategoryRepository;
