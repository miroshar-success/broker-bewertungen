import { IRepositoryOptions } from '../IRepositoryOptions';
import NavigationRepository from '../navigationRepository';
import Sequelize from 'sequelize';

const Op = Sequelize.Op;

class NavigationRepositoryEx extends NavigationRepository {
  static async filterNavigationIds(
    type = null,
    options: IRepositoryOptions,
  ) {
    const typeIndex =
      NavigationRepository.getTypeIndex(type);

    const navigation_ids =
      await options.database.navigation.findAll({
        attributes: ['id'],
        where: {
          type: typeIndex,
        },
      });

    return navigation_ids.map((v) => v.id);
  }
}

export default NavigationRepositoryEx;
