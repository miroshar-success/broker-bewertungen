import { DataTypes } from 'sequelize';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const page = sequelize.define(
    'page',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      navigation_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      meta_keywords: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      meta_description: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      teaser: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
        },
      },
      target: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultvalue: '',
        validate: {
          len: [0, 15],
        },
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pdf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      author_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      author_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      author_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      frontpage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      page_warning_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
      },
      ip: {
        type: DataTypes.CHAR(39),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 39],
        },
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      modified: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      indexes: [
        {
          fields: ['navigation_id'],
        },
        {
          fields: ['parent_id'],
        },
        {
          fields: ['activated'],
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  page.associate = (models) => {
    models.page.belongsTo(models.page, {
      as: 'parent',
      constraints: true,
      foreignKey: 'parent_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.page.belongsTo(models.navigation, {
      as: 'navigation',
      constraints: true,
      foreignKey: 'navigation_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.page.belongsTo(models.author, {
      as: 'author',
      constraints: true,
      foreignKey: 'author_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.page.belongsTo(models.page_warning, {
      as: 'page_warning',
      constraints: true,
      foreignKey: 'page_warning_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.page.hasMany(models.file, {
      as: 'page_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.page.getTableName(),
        belongsToColumn: 'page_image',
      },
    });
  };

  return page;
}
