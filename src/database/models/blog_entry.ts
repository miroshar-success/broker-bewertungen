import { DataTypes } from 'sequelize';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const blog_entry = sequelize.define(
    'blog_entry',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
      name_normalized: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      pagetitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      metadescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      metakeywords: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
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
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      teaser: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
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
          fields: ['name_normalized'],
          name: 'name_normalized',
          type: 'unique',
        },
        {
          fields: ['activated'],
          name: 'activated',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  blog_entry.associate = (models) => {
    models.blog_entry.belongsTo(models.author, {
      as: 'author',
      constraints: true,
      foreignKey: 'author_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.blog_entry.hasMany(models.file, {
      as: 'blog_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.blog_entry.getTableName(),
        belongsToColumn: 'blog_image',
      },
    });

    models.blog_entry.hasMany(models.blog_comment, {
      as: 'blog_comment',
      foreignKey: 'blog_entry_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return blog_entry;
}
