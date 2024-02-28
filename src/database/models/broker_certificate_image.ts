import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_certificate_image = sequelize.define(
    'broker_certificate_image',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      broker_certificate_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      filename: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      mimetype: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
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
        defaultValue: false,
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

  broker_certificate_image.associate = (models) => {
    models.broker_certificate_image.belongsTo(
      models.broker_certificate,
      {
        as: 'broker_certificate',
        constraints: true,
        foreignKey: 'broker_certificate_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );
  };

  return broker_certificate_image;
}
