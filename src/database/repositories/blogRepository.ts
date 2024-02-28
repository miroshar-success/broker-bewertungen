import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import moment from 'moment';
import { orderByUtils } from '../utils/orderByUtils';
import FileRepository from './fileRepository';
import BlogBrokerRepository from './blogBrokerRepository';
import BrokerRepository from './brokerRepository';
import BlogCommentRepository from './blogCommentRepository';
import AuthorRepository from './authorRepository';
import { safeURL } from '../utils/stringUtils';
const Op = Sequelize.Op;

class BlogRepository {
  static ALL_FIELDS = [
    'name',
    'name_normalized',
    'pagetitle',
    'metadescription',
    'metakeywords',
    'content',
    'activated',
  ];

  static _relatedData(data) {
    return {
      teaser: data.teaser ?? '',
      author_id: data.author ? data.author.id : null,
      ip: '',
    };
  }

  static async _replaceRelationFiles(
    record,
    data,
    options: IRepositoryOptions,
  ) {
    await FileRepository.replaceRelationFiles(
      {
        belongsTo:
          options.database.blog_entry.getTableName(),
        belongsToColumn: 'blog_image',
        belongsToId: record.id,
      },
      data.blog_image.map((v) => ({
        ...v,
        link: null,
        linkTitle: null,
        new: true,
      })),
      options,
    );
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    const record = await options.database.blog_entry.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
        created: data.created ? data.created : moment(),
        modified: data.created ? data.created : moment(),
      },
      {
        transaction,
      },
    );

    if (data.blog_image) {
      await this._replaceRelationFiles(
        record,
        data,
        options,
      );
    }
    await this._createAuditLog(
      AuditLogRepository.CREATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async update(
    id,
    data,
    options: IRepositoryOptions,
  ) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record = await options.database.blog_entry.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }
    record = await record.update(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        ...this._relatedData(data),
        modified: data.created ? data.created : moment(),
      },
      {
        transaction,
      },
    );

    await this._replaceRelationFiles(record, data, options);

    await this._createAuditLog(
      AuditLogRepository.UPDATE,
      record,
      data,
      options,
    );

    return this.findById(record.id, options);
  }

  static async destroy(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    let record = await options.database.blog_entry.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

    await BlogBrokerRepository.destroyByBlog(id, options);

    await FileRepository.destroy(
      {
        belongsTo:
          options.database.blog_entry.getTableName(),
        belongsToId: id,
      },
      options,
    );

    await record.destroy({
      transaction,
    });

    await this._createAuditLog(
      AuditLogRepository.DELETE,
      record,
      record,
      options,
    );
  }

  static async findById(id, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = [
      {
        model: options.database.author,
        as: 'author',
      },
    ];

    const record =
      await options.database.blog_entry.findOne({
        where: {
          id,
        },
        include,
        transaction,
      });

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(
      record,
      options,
      false,
    );
  }

  static async findByURL(url, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);
    const include = [
      {
        model: options.database.author,
        as: 'author',
        include: {
          model: options.database.file,
          as: 'author_image',
          separate: true,
        },
      },
    ];
    const safeUrl = safeURL(url);
    let record = await options.database.blog_entry.findOne({
      where: {
        name_normalized: safeUrl.substring(
          safeUrl.lastIndexOf('/') + 1,
        ),
        activated: true,
      },
      include,
      transaction,
    });

    return this._fillWithRelationsAndFiles(
      record,
      options,
      false,
    );
  }

  static async filterIdInTenant(
    id,
    options: IRepositoryOptions,
  ) {
    return lodash.get(
      await this.filterIdsInTenant([id], options),
      '[0]',
      null,
    );
  }

  static async filterIdsInTenant(
    ids,
    options: IRepositoryOptions,
  ) {
    if (!ids || !ids.length) {
      return [];
    }

    const where = {
      id: {
        [Op.in]: ids,
      },
    };

    const records =
      await options.database.blog_entry.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.blog_entry.count({
      where: {
        ...filter,
      },
      transaction,
    });
  }

  static async findAndCountAll(
    { filter, limit = 0, offset = 0, orderBy = '' },
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];
    const include = [
      // {
      //   model: options.database.navigation,
      //   as: 'navigation',
      // },
      {
        model: options.database.author,
        as: 'author',
      },
      {
        model: options.database.blog_comment,
        as: 'blog_comment',
        attributes: [
          'blog_entry_id',
          [
            Sequelize.fn('COUNT', Sequelize.col('id')),
            'comments',
          ],
        ],
        separate: true,
        group: ['blog_entry_id'],
      },
    ];
    if (filter) {
      if (filter.idRange) {
        const [start, end] = filter.idRange;

        if (
          start !== undefined &&
          start !== null &&
          start !== ''
        ) {
          whereAnd.push({
            id: {
              [Op.gte]: start,
            },
          });
        }

        if (
          end !== undefined &&
          end !== null &&
          end !== ''
        ) {
          whereAnd.push({
            id: {
              [Op.lte]: end,
            },
          });
        }
      }

      // if (filter.navigation) {
      //   if (
      //     filter.navigation !== undefined &&
      //     filter.navigation !== null &&
      //     filter.navigation !== ''
      //   ) {
      //     whereAnd.push({
      //       navigation_id: filter.navigation.id,
      //     });
      //   }
      // }
      if (filter.author) {
        if (
          filter.author !== undefined &&
          filter.author !== null &&
          filter.author !== ''
        ) {
          whereAnd.push({
            author_id: filter.author.id,
          });
        }
      }
      [
        'name',
        'pagetitle',
        'metakeywords',
        'metadescription',
        'content',
        'teaser',
      ].forEach((field) => {
        if (filter[field]) {
          whereAnd.push(
            SequelizeFilterUtils.ilikeIncludes(
              'blog_entry',
              field,
              filter[field],
            ),
          );
        }
      });

      if (filter.broker) {
        whereAnd.push({
          id: {
            [Op.in]: (
              await BlogBrokerRepository.findAndCountAll(
                { filter: { broker_id: filter.broker } },
                options,
              )
            ).rows.map((row) => row.id),
          },
        });
      }

      ['activated'].forEach((field) => {
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
      await options.database.blog_entry.findAndCountAll({
        where,
        include,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: orderBy
          ? [orderByUtils(orderBy, options)]
          : [['id', 'DESC']],
        transaction:
          SequelizeRepository.getTransaction(options),
      });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
      true,
    );

    return { rows, count };
  }

  static async findAllAutocomplete(
    query,
    limit,
    options: IRepositoryOptions,
  ) {
    let whereAnd: Array<any> = [];

    if (query) {
      whereAnd.push({
        [Op.or]: [
          { ['id']: query },
          {
            [Op.and]: SequelizeFilterUtils.ilikeIncludes(
              'blog_entry',
              'name',
              query,
            ),
          },
        ],
      });
    }

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.blog_entry.findAll({
        attributes: ['id', 'name'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [['name', 'ASC']],
      });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }

  static async _createAuditLog(
    action,
    record,
    data,
    options: IRepositoryOptions,
  ) {
    let values = {};

    if (data) {
      values = {
        ...record.get({ plain: true }),
      };
    }

    await AuditLogRepository.log(
      {
        entityName: 'blog_entry',
        entityId: record.id,
        action,
        values,
      },
      options,
    );
  }

  static async _fillWithRelationsAndFilesForRows(
    rows,
    options: IRepositoryOptions,
    metaOnly,
  ) {
    if (!rows) {
      return rows;
    }

    return Promise.all(
      rows.map((record) =>
        this._fillWithRelationsAndFiles(
          record,
          options,
          metaOnly,
        ),
      ),
    );
  }

  static async _fillWithRelationsAndFiles(
    record,
    options: IRepositoryOptions,
    metaOnly = true,
  ) {
    if (!record) {
      return record;
    }

    const output = record.get({ plain: true });

    output.comments =
      (output.blog_comment &&
        output.blog_comment.length &&
        output.blog_comment[0]?.comments) ||
      0;

    if (metaOnly) {
      return output;
    }
    output.author =
      await AuthorRepository._fillWithRelationsAndFiles(
        record.author,
        options,
      );
    const blogParam = {
      filter: {
        blog_entry_id: output.id,
      },
    };

    const transaction =
      SequelizeRepository.getTransaction(options);

    output.blog_image =
      await FileRepository.fillDownloadUrl(
        await record.getBlog_image({
          transaction,
        }),
      );
    const { rows: blog_broker } =
      await BlogBrokerRepository.findAndCountAll(
        blogParam,
        options,
      );
    output.brokers =
      blog_broker.map((v) => ({
        id: v.broker_id,
      })) || [];
    return output;
  }

  static async findBlogList(
    { limit = 0, offset = 0 },
    options: IRepositoryOptions,
  ) {
    const whereAnd: Array<any> = [
      {
        activated: true,
      },
    ];
    const where = { [Op.and]: whereAnd };
    let { rows, count } =
      await options.database.blog_entry.findAndCountAll({
        where,
        limit: limit ? Number(limit) : undefined,
        offset: offset ? Number(offset) : undefined,
        order: [['id', 'DESC']],
        transaction:
          SequelizeRepository.getTransaction(options),
      });

    rows = await this._fillWithRelationsAndFilesForRows(
      rows,
      options,
      false,
    );
    return { rows, count };
  }
}

export default BlogRepository;
