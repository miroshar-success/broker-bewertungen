import { IRepositoryOptions } from './IRepositoryOptions';
import SequelizeRepository from './sequelizeRepository';

class ImageMigrationRepository {
  static async truncate(
    modelName,
    options: IRepositoryOptions,
  ) {
    const model = options.database[`${modelName}`];
    if (!model) {
      return;
    }

    await model.destroy({
      truncate: true,
      transaction:
        SequelizeRepository.getTransaction(options),
    });
  }

  static async destroyById(
    modelName,
    id,
    options: IRepositoryOptions,
  ) {
    const model = options.database[`${modelName}`];
    if (!model) {
      return;
    }

    await model.destroy({
      where: {
        id,
      },
      transaction:
        SequelizeRepository.getTransaction(options),
    });
  }

  static async count(
    modelName,
    options: IRepositoryOptions,
  ) {
    const model = options.database[`${modelName}`];
    if (!model) {
      return 0;
    }

    return model.count({
      transaction:
        SequelizeRepository.getTransaction(options),
    });
  }

  static async findAll(
    modelName,
    {
      where = undefined,
      limit = 0,
      offset = 0,
      orderBy = '',
    },
    options: IRepositoryOptions,
  ) {
    const model = options.database[`${modelName}`];
    if (!model) {
      return [];
    }

    return await model.findAll({
      where: where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      order: orderBy
        ? [orderBy.split('_')]
        : [['id', 'ASC']],
      transaction:
        SequelizeRepository.getTransaction(options),
    });
  }

  static async create(data, options: IRepositoryOptions) {
    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    await options.database.file.create(
      {
        belongsTo: data.belongsTo,
        belongsToColumn: data.belongsToColumn,
        belongsToId: data.belongsToId,
        name: data.name,
        type: data.type || '',
        link: data.link || '',
        linkTitle: data.linkTitle || '',
        sizeInBytes: data.sizeInBytes,
        privateUrl: data.privateUrl || '',
        publicUrl: data.publicUrl || null,
        tenantId: currentTenant.id,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      {
        transaction:
          SequelizeRepository.getTransaction(options),
      },
    );
  }
}

export default ImageMigrationRepository;
