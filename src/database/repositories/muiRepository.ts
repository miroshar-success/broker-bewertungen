import SequelizeRepository from './sequelizeRepository';
import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class MuiRepository {
  static async find(options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const record = await options.database.mui.findOne({
      where: {
        userId: currentUser.id,
        tenantId: currentTenant.id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    return record;
  }

  static async findOrCreateDefault(
    defaults,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const first = await options.database.mui.findOne({
      where: {
        userId: currentUser.id,
        tenantId: currentTenant.id,
      },
      transaction,
    });

    if (first) {
      return first;
    }

    const record = await options.database.mui.create(
      {
        ...lodash.pick(defaults, [
          'miniSidenav',
          'transparentSidenav',
          'whiteSidenav',
          'sidenavColor',
          'transparentNavbar',
          'fixedNavbar',
          'direction',
          'darkMode',
        ]),
        userId: currentUser.id,
        tenantId: currentTenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    return record;
  }

  static async save(data, options: IRepositoryOptions) {
    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const transaction =
      SequelizeRepository.getTransaction(options);

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    let record = await options.database.mui.findOne({
      where: {
        userId: currentUser.id,
        tenantId: currentTenant.id,
      },
      transaction,
    });

    record = await record.update(
      {
        ...lodash.pick(data, [
          'miniSidenav',
          'transparentSidenav',
          'whiteSidenav',
          'sidenavColor',
          'transparentNavbar',
          'fixedNavbar',
          'direction',
          'darkMode',
        ]),
        updatedById: currentUser.id,
      },
      {
        transaction,
      },
    );

    return this.find(options);
  }
}
