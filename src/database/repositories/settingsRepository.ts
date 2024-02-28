import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import AuditLogRepository from './auditLogRepository';
import FileRepository from './fileRepository';
import _get from 'lodash/get';
import { IRepositoryOptions } from './IRepositoryOptions';

export default class SettingsRepository {
  static async findOrCreateDefault(
    defaults,
    options: IRepositoryOptions,
  ) {
    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const tenant =
      SequelizeRepository.getCurrentTenant(options);

    const [settings] =
      await options.database.settings.findOrCreate({
        where: { id: tenant.id, tenantId: tenant.id },
        defaults: {
          ...defaults,
          id: tenant.id,
          tenantId: tenant.id,
          createdById: currentUser ? currentUser.id : null,
        },
        transaction:
          SequelizeRepository.getTransaction(options),
      });

    return this._fillWithRelationsAndFiles(
      settings,
      options,
    );
  }

  static async save(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const tenant =
      SequelizeRepository.getCurrentTenant(options);

    data.backgroundImageUrl = _get(
      data,
      'backgroundImages[0].downloadUrl',
      null,
    );
    data.logoUrl = _get(data, 'logos[0].downloadUrl', null);

    const [settings] =
      await options.database.settings.findOrCreate({
        where: { id: tenant.id, tenantId: tenant.id },
        defaults: {
          ...data,
          id: tenant.id,
          tenantId: tenant.id,
          createdById: currentUser ? currentUser.id : null,
        },
        transaction,
      });

    await settings.update(data, {
      transaction,
    });

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.settings.getTableName(),
        belongsToColumn: 'logos',
        belongsToId: settings.id,
      },
      data.logos,
      options,
    );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo: options.database.settings.getTableName(),
        belongsToColumn: 'backgroundImages',
        belongsToId: settings.id,
      },
      data.backgroundImages,
      options,
    );

    await AuditLogRepository.log(
      {
        entityName: 'settings',
        entityId: settings.id,
        action: AuditLogRepository.UPDATE,
        values: data,
      },
      options,
    );

    return await this._fillWithRelationsAndFiles(
      settings,
      options,
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

    output.logos = await FileRepository.fillDownloadUrl(
      await record.getLogos({
        transaction,
      }),
    );

    output.backgroundImages =
      await FileRepository.fillDownloadUrl(
        await record.getBackgroundImages({
          transaction,
        }),
      );

    return output;
  }
}
