import { IRepositoryOptions } from './IRepositoryOptions';
import lodash from 'lodash';
import Sequelize from 'sequelize';
import SequelizeRepository from './sequelizeRepository';
import { orderByUtils } from '../utils/orderByUtils';
import { Console } from 'console';

const Op = Sequelize.Op;

class ExpertAdvisorTestMetaRepository {
  static ALL_FIELDS = [
    'homepage',
    'description',
    'meta_description',
    'meta_keywords',
  ];
  static NOT_EMPTY_FIELDS = [
    'homepage',
    'description',
    'meta_description',
    'meta_keywords',
  ];

  static _relatedData(data, options) {
    return {
      homepage: data.homepage || '',
      description: data.description || '',
      meta_description: data.meta_description || '',
      meta_keywords: data.meta_keywords || '',
      id: data.id || null,
      ip: '',
    };
  }
  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    await options.database.expert_advisor_test_metas.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data, options),
      },
      {
        transaction,
      },
    );
  }

  static async destroyByExpertAdvisorTest(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    await options.database.expert_advisor_test_metas.destroy(
      {
        where: {
          id: id,
        },
        transaction,
      },
    );
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    const include = [];

    if (filter) {
      ['id'].forEach((field) => {
        if (filter[field]) {
          whereAnd.push({
            [field]: filter[field],
          });
        }
      });

      [
        'homepage',
        'meta_description',
        'meta_keywords',
      ].forEach((field) => {
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
      await options.database.expert_advisor_test_metas.findAndCountAll(
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

export default ExpertAdvisorTestMetaRepository;
