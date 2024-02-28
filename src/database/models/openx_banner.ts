import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const openx_banner = sequelize.define(
    'openx_banner',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      code: {
        type: DataTypes.TEXT(),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
        },
      },
      noscript: {
        type: DataTypes.TEXT(),
        allowNull: false,
        defaultValue: '',
      },
      hash: {
        type: DataTypes.CHAR(32),
        allowNull: false,
        defaultValue: '',
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      zone: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
        },
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
      indexes: [
        {
          fields: ['hash', 'zone'],
          name: 'hash_zone',
          type: 'unique',
        },
        {
          fields: ['zone'],
          name: 'zone',
        },
        {
          fields: ['zone', 'activated'],
          name: 'zone_activated',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  openx_banner.associate = (models) => {};

  return openx_banner;
}
