import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const news_image = sequelize.define(
    'news_image',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      filename: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      link_title: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      mimetype: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      width: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [0, 10],
        },
      },
      height: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [0, 10],
        },
      },
      optimized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      ip: {
        type: DataTypes.CHAR(39),
        allowNull: false,
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
      indexes: [],
      underscored: true,
      timestamps: false,
    },
  );
  news_image.associate = (models) => {
    models.news_image.belongsTo(models.news, {
      constraints: true,
      foreignKey: 'id',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  };
  return news_image;
}
