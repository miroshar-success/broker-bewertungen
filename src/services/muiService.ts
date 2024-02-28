import MuiRepository from '../database/repositories/muiRepository';
import SequelizeRepository from '../database/repositories/sequelizeRepository';
import { IServiceOptions } from './IServiceOptions';

const DEFAULT_SETTINGS = {
  miniSidenav: false,
  transparentSidenav: false,
  whiteSidenav: false,
  sidenavColor: 'info',
  transparentNavbar: true,
  fixedNavbar: true,
  direction: 'ltr',
  darkMode: false,
};

class MuiService {
  static async findOrCreateDefault(options) {
    return MuiRepository.findOrCreateDefault(
      DEFAULT_SETTINGS,
      options,
    );
  }

  static async save(data, options: IServiceOptions) {
    const transaction =
      await SequelizeRepository.createTransaction(
        options.database,
      );
    try {
      const settings = await MuiRepository.save(
        data,
        options,
      );

      await SequelizeRepository.commitTransaction(
        transaction,
      );

      return settings;
    } catch (error) {
      await SequelizeRepository.rollbackTransaction(
        transaction,
      );

      SequelizeRepository.handleUniqueFieldError(
        error,
        options.language,
        'mui',
      );

      throw error;
    }
  }
}

export default MuiService;
