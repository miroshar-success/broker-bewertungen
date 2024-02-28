import lodash from 'lodash';
import Sequelize from 'sequelize';
import FileRepository from './fileRepository';
import { IRepositoryOptions } from './IRepositoryOptions';
import SequelizeRepository from './sequelizeRepository';

const Op = Sequelize.Op;

class BrokerCertificateRepository {
  static ALL_FIELDS = ['name', 'url'];
  static NOT_EMPTY_FIELDS = [];

  static _relatedData(data, options) {
    SequelizeRepository.handleNotEmptyField(
      data,
      this.NOT_EMPTY_FIELDS,
      options.language,
      'broker_certificate',
    );
    return {
      broker_id: data.broker || null,
      ip: data.ip || '',
    };
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record =
      await options.database.broker_certificate.create(
        {
          ...lodash.pick(data, this.ALL_FIELDS),
          ...this._relatedData(data, options),
        },
        {
          transaction,
        },
      );

    await FileRepository.replaceRelationFiles(
      {
        belongsTo:
          options.database.broker_certificate.getTableName(),
        belongsToColumn:
          'broker_certificate_image_certificate_image',
        belongsToId: record.id,
      },
      data.image.map((v) => ({
        ...v,
        type: 'certificate_image',
        new: true,
      })),
      options,
    );
  }

  static async destroyByBroker(
    id,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const records =
      await options.database.broker_certificate.findAll({
        where: {
          broker_id: id,
        },
        transaction,
      });

    for (const record of records) {
      await record.destroy({ transaction });
      await FileRepository.destroy(
        {
          belongsTo:
            options.database.broker_certificate.getTableName(),
          belongsToColumn:
            'broker_certificate_image_certificate_image',
          belongsToId: record.id,
        },
        options,
      );
    }
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    const include = [];

    if (filter) {
      ['broker_id'].forEach((field) => {
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
      await options.database.broker_certificate.findAndCountAll(
        {
          where,
          include,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order: orderBy
            ? [orderBy.split('_')]
            : [['id', 'ASC']],
          transaction:
            SequelizeRepository.getTransaction(options),
        },
      );

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
    );

    return { rows, count };
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(record, options),
      ),
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

    output.image = await FileRepository.fillDownloadUrl(
      await record.getBroker_certificate_image_certificate_image(
        {
          transaction,
        },
      ),
    );

    return output;
  }
}

export default BrokerCertificateRepository;
