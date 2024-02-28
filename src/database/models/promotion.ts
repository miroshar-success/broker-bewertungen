import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const promotion = sequelize.define(
    'promotion',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      sort: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
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
      target: {
        type: DataTypes.STRING(15),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 15],
        },
      },
      filename: {
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
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      height: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0,
      },
      optimized: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  promotion.associate = (models) => {
    models.promotion.hasMany(models.file, {
      as: 'promotion_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.promotion.getTableName(),
        belongsToColumn: 'promotion_image',
      },
    });
  };
  return promotion;
}
