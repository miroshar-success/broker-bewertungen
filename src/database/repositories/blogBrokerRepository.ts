import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Sequelize from 'sequelize';
import SequelizeRepository from './sequelizeRepository';
import { orderByUtils } from '../utils/orderByUtils';
import { Console } from 'console';

const Op = Sequelize.Op;

class BlogBrokerRepository {
  static ALL_FIELDS = ['broker_id', 'blog_entry_id'];

  static _relatedData(data) {
    return {
      broker_id: data.broker_id || null,
      blog_entry_id: data.blog_entry_id || null,
    };
  }
  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.blog_entries_broker.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
      },
      {
        transaction,
      },
    );
  }

  static async destroyByBlog(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.blog_entries_broker.destroy({
      where: {
        blog_entry_id: id,
      },
      transaction,
    });
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    const include = [];

    if (filter) {
      ['broker_id', 'blog_entry_id'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push({
            [field]: filter[field],
          });
        }
      });
    }

    const where = { [Op.and]: whereAnd };

    let { rows, count } =
      await options.database.blog_entries_broker.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderByUtils(orderBy, options)]
            : [['broker_id', 'ASC']],
          transaction:
            SequelizeRepository.getTransaction(options),
        },
      );

    return { rows, count };
  }
}

export default BlogBrokerRepository;
