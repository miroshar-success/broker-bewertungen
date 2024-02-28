import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_deposit_guarantee = sequelize.define(
    'broker_deposit_guarantee',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      url: {
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
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
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

  broker_deposit_guarantee.associate = (models) => {
    models.broker_deposit_guarantee.belongsTo(
      models.broker,
      {
        as: 'broker',
        constraints: true,
        foreignKey: 'broker_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );
  };

  return broker_deposit_guarantee;
}
