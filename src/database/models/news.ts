import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const news = sequelize.define(
    'news',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
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
        type: DataTypes.TEXT(),
        allowNull: false,
        defaultValue: '',
      },
      body: {
        type: DataTypes.TEXT(),
        allowNull: false,
        defaultValue: '',
      },
      target: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 15],
        },
      },
      sort: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [0, 11],
        },
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
      frontpage: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      page_warning_id: {
        type: DataTypes.BIGINT(),
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
          fields: ['activated'],
          name: 'activated',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  news.associate = (models) => {
    models.news.hasMany(models.file, {
      as: 'news_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.news.getTableName(),
        belongsToColumn: 'news_image',
      },
    });
  };

  return news;
}
