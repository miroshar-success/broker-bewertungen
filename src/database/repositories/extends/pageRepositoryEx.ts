import { IRepositoryOptions } from '../IRepositoryOptions';
import PageRepository from '../pageRepository';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

class PageRepositoryEx extends PageRepository {
  static async filterNavigationIds(
    excludes: any[] = [],
    options: IRepositoryOptions,
  ) {
    const notIn: any[] = excludes ?? [];
    notIn.push(0);
    const navigation_ids =
      await options.database.page.findAll({
        attributes: [
          [
            Sequelize.fn(
              'DISTINCT',
              Sequelize.col('navigation_id'),
            ),
            'id',
          ],
        ],
        where: {
          id: {
            [Op.notIn]: notIn,
          },
          navigation_id: {
            [Op.not]: null,
          },
        },
      });
    return navigation_ids.map((v) => v.id ?? 0);
  }
}

export default PageRepositoryEx;
