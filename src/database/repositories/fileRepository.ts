import { IRepositoryOptions } from './IRepositoryOptions';
import assert from 'assert';
import FileStorage from '../../services/file/fileStorage';
import fs from 'fs';
import SequelizeRepository from '../../database/repositories/sequelizeRepository';
import LocalFileStorage from '../../services/file/localhostFileStorage';
import { getConfig } from '../../config';

export default class FileRepository {
  static async fillDownloadUrl(files) {
    if (!files) {
      return files;
    }

    return await Promise.all(
      files.map(async (file) => {
        let downloadUrl;

        if (file.publicUrl) {
          downloadUrl = file.publicUrl;
        } else {
          downloadUrl = await FileStorage.downloadUrl(
            file.privateUrl,
          );
        }

        return {
          ...file.get({ plain: true }),
          downloadUrl,
        };
      }),
    );
  }

  /**
   * Updates the file list for some record.
   */
  static async replaceRelationFiles(
    relation,
    rawFiles,
    options: IRepositoryOptions,
  ) {
    this._validateReplaceRelationFiles(relation, options);
    const files = this._normalizeFiles(rawFiles);

    await this._removeLegacyFiles(relation, files, options);
    await this._addFiles(relation, files, options);
  }

  /**
   * Transforms the files into an array if it's an object.
   */
  static _normalizeFiles(rawFiles = []) {
    let files = [];

    if (Array.isArray(rawFiles)) {
      files = rawFiles;
    } else {
      files = rawFiles ? [rawFiles] : [];
    }

    return files;
  }

  /**
   * Validates required data for files.
   */
  static _validateReplaceRelationFiles(
    relation,
    options: IRepositoryOptions,
  ) {
    assert(relation.belongsTo, 'belongsTo is required');
    assert(
      relation.belongsToColumn,
      'belongsToColumn is required',
    );
    assert(relation.belongsToId, 'belongsToId is required');
  }

  /**
   * Filter file ids that already exists on the database.
   */
  static _existingFilesIds(files) {
    return files
      .filter((file) => !file.new)
      .map((file) => file.id);
  }

  /**
   * Creates the new files on the database.
   */
  static async _addFiles(
    relation,
    files,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const currentUser =
      SequelizeRepository.getCurrentUser(options);

    const currentTenant =
      SequelizeRepository.getCurrentTenant(options);

    const inexistentFiles = files.filter((file) =>
      Boolean(file.new),
    );

    for (const file of inexistentFiles) {
      await options.database.file.create(
        {
          belongsTo: relation.belongsTo,
          belongsToColumn: relation.belongsToColumn,
          belongsToId: relation.belongsToId,
          name: file.name,
          type: file.type || '',
          link: file.link || '',
          linkTitle: file.linkTitle || '',
          sizeInBytes: file.sizeInBytes,
          privateUrl: file.privateUrl,
          publicUrl: file.publicUrl,
          tenantId: currentTenant.id,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        {
          transaction,
        },
      );
    }
  }

  static async destroy(
    relation,
    options: IRepositoryOptions,
  ) {
    await options.database.file.destroy({
      where: relation,
      transaction:
        SequelizeRepository.getTransaction(options),
    });
  }

  /**
   * Remove files that don't exist on the new list.
   */
  static async _removeLegacyFiles(
    relation,
    files,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const filesToDelete =
      await options.database.file.findAll({
        where: {
          belongsTo: relation.belongsTo,
          belongsToId: relation.belongsToId,
          belongsToColumn: relation.belongsToColumn,
          id: {
            [options.database.Sequelize.Op.notIn]:
              this._existingFilesIds(files),
          },
        },
        transaction,
      });

    for (let file of filesToDelete) {
      await file.destroy({
        transaction,
      });
    }
  }
}
