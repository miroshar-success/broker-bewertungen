import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Sequelize from 'sequelize';
import SequelizeRepository from './sequelizeRepository';
import { orderByUtils } from '../utils/orderByUtils';
import { Console } from 'console';

const Op = Sequelize.Op;

class PageRelatedLinkRepository {
  static ALL_FIELDS = ['name', 'url'];
  static NOT_EMPTY_FIELDS = ['name', 'url'];

  static _relatedData(data, options) {
    SequelizeRepository.handleNotEmptyField(
      data,
      this.NOT_EMPTY_FIELDS,
      options.language,
      'page',
    );
    return {
      name: data.name || '',
      url: data.url || '',
      page_id: data.page_id || null,
      ip: '',
    };
  }
  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.page_related_link.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data, options),
      },
      {
        transaction,
      },
    );
  }

  static async destroyByPage(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.page_related_link.destroy({
      where: {
        page_id: id,
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
      ['page_id'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push({
            [field]: filter[field],
          });
        }
      });

      [].forEach((field) => {
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
      await options.database.page_related_link.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderByUtils(orderBy, options)]
            : [['id', 'ASC']],
          transaction:
            SequelizeRepository.getTransaction(options),
        },
      );

    return { rows, count };
  }
}

export default PageRelatedLinkRepository;
