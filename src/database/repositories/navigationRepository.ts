import lodash from 'lodash';
import Error404 from '../../errors/Error404';
import Sequelize from 'sequelize';
import { IRepositoryOptions } from './IRepositoryOptions';
import AuditLogRepository from './auditLogRepository';
import SequelizeRepository from './sequelizeRepository';
import SequelizeFilterUtils from '../utils/sequelizeFilterUtils';
import moment from 'moment';
import { orderByUtils } from '../utils/orderByUtils';
import { safeURL } from '../utils/stringUtils';

const Op = Sequelize.Op;

class NavigationRepository {
  static ALL_FIELDS = [
    'name',
    'link',
    'title',
    'target',
    'sort',
    'activated',
    'show_user_logged_in',
    'show_in_navigation',
    'type',
  ];

  static TYPES = [
    'NONE',
    'FOREX_SCHOOL',
    'FOREX_STRATEGY',
    'DOWNLOADS',
    'NEWS',
    'OFFERS',
    'MOST_READ',
  ];

  static SHOW_PARENT = [
    'FOREX_SCHOOL',
    'FOREX_STRATEGY',
    'DOWNLOADS',
  ];

  static getTypeIndex(type) {
    if (!type) {
      return 0;
    }
    const index = this.TYPES.indexOf(
      type.toString().toUpperCase(),
    );
    return index < 0 ? 0 : index;
  }

  static async create(data, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    const record = await options.database.navigation.create(
      {
        ...lodash.pick(data, this.ALL_FIELDS),
        parent_id: data.parent || null,
        target: data.target ?? '',
        type: this.getTypeIndex(data.type),
        ip: '',
        created: moment(),
        modified: moment(),
      },
      {
        transaction,
      },
    );

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

    let record = await options.database.navigation.findOne({
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
        parent_id: data.parent || null,
        target: data.target ?? '',
        type: this.getTypeIndex(data.type),
        modified: moment(),
        ip: '',
      },
      {
        transaction,
      },
    );

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

    let record = await options.database.navigation.findOne({
      where: {
        id,
      },
      transaction,
    });

    if (!record) {
      throw new Error404();
    }

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
        model: options.database.navigation,
        as: 'parent',
      },
    ];

    const record =
      await options.database.navigation.findOne({
        where: {
          id,
        },
        include,
        transaction,
      });

    if (!record) {
      throw new Error404();
    }

    return this._fillWithRelationsAndFiles(record, options);
  }

  static async findByURL(url, options: IRepositoryOptions) {
    const safeUrl = safeURL(url);

    const transaction =
      SequelizeRepository.getTransaction(options);

    const include = [
      {
        model: options.database.navigation,
        as: 'parent',
      },
    ];

    const record =
      await options.database.navigation.findOne({
        where: {
          link: safeUrl,
        },
        include,
        transaction,
      });

    if (!record) {
      return null;
    }

    return this._fillWithRelationsAndFiles(record, options);
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
      await options.database.navigation.findAll({
        attributes: ['id'],
        where,
      });

    return records.map((record) => record.id);
  }

  static async count(filter, options: IRepositoryOptions) {
    const transaction =
      SequelizeRepository.getTransaction(options);

    return options.database.navigation.count({
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
    let include = [
      {
        model: options.database.navigation,
        as: 'parent',
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

      if (filter.parent) {
        whereAnd.push({
          ['parent_id']: filter.parent,
        });
      }

      ['name', 'link', 'title', 'target'].forEach(
        (field) => {
          if (filter[field]) {
            whereAnd.push(
              SequelizeFilterUtils.ilikeIncludes(
                'navigation',
                field,
                filter[field],
              ),
            );
          }
        },
      );

      if (filter.type) {
        whereAnd.push({
          type: this.getTypeIndex(filter.type),
        });
      }

      [
        'activated',
        'show_user_logged_in',
        'show_in_navigation',
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
      await options.database.navigation.findAndCountAll({
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
    );

    return { rows, count };
  }

  static async findForHome(options: IRepositoryOptions) {
    let include = [
      {
        model: options.database.navigation,
        as: 'children',
        attributes: ['name', ['link', 'route']],
        where: {
          activated: true,
          show_in_navigation: true,
        },
        order: [
          ['sort', 'ASC'],
          // ['name', 'ASC'],
        ],
        separate: true,
      },
    ];

    const whereAnd: Array<any> = [
      {
        parent_id: { [Op.is]: null },
        activated: true,
        show_in_navigation: true,
      },
    ];

    const where = { [Op.and]: whereAnd };

    const records =
      await this._fillWithRelationsAndFilesForRows(
        await options.database.navigation.findAll({
          attributes: ['name', ['link', 'route'], 'type'],
          where,
          include,
          order: [
            ['sort', 'ASC'],
            // ['name', 'ASC'],
          ],
        }),
        options,
      );

    records.forEach((record) => {
      if (this.SHOW_PARENT.includes(record.type)) {
        if (!record.children) {
          record.children = [];
        }
        record.children.unshift(
          lodash.pick(record, ['name', 'route', 'type']),
        );
      }
    });

    return records;
  }

  static async findAllAutocomplete(
    query,
    limit,
    options: IRepositoryOptions,
    withChildren = false,
    excludes: any[] = [0],
  ) {
    let whereAnd: Array<any> = [
      {
        title: {
          [Op.ne]: '',
        },
      },
    ];

    if (query) {
      whereAnd.push({
        [Op.and]: SequelizeFilterUtils.ilikeIncludes(
          'navigation',
          'title',
          query,
        ),
      });
    }

    if (!withChildren) {
      whereAnd.push({
        parent_id: {
          [Op.is]: null,
        },
      });
    }

    whereAnd.push({
      id: {
        [Op.notIn]: excludes,
      },
    });

    const where = { [Op.and]: whereAnd };

    const records =
      await options.database.navigation.findAll({
        attributes: ['id', 'title', 'parent_id'],
        where,
        limit: limit ? Number(limit) : undefined,
        order: [
          ['parent_id', 'ASC'],
          ['sort', 'ASC'],
          ['title', 'ASC'],
        ],
      });

    const roots = withChildren
      ? await this.findAllAutocomplete(null, null, options)
      : [];

    const findParent = (parent) => {
      const root = roots.find((v) => v.id === parent);
      return {
        id: root?.id,
        label: root?.label || 'Root',
      };
    };

    let realParents: any[] = [];
    if (withChildren) {
      realParents =
        await options.database.navigation.findAll({
          attributes: [
            [
              Sequelize.fn(
                'DISTINCT',
                Sequelize.col('parent_id'),
              ),
              'id',
            ],
          ],
          where: {
            parent_id: {
              [Op.not]: null,
            },
          },
        });
    }

    return records.map((record) => ({
      id: record.id,
      label: record.title,
      parent: findParent(record.parent_id),
      hasChildren: !!realParents.find(
        (v) => v.id === record.id,
      ),
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
        entityName: 'navigation',
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

    return output;
  }
}

export default NavigationRepository;
