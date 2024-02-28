import { DataTypes } from 'sequelize';
import SequelizeUtils from '../utils/sequelizeUtils';

export default function (sequelize) {
  const broker_minimum_trading_unit = sequelize.define(
    'broker_minimum_trading_unit',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: '',
      },
      minimum_trading_unit: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
        get() {
          return SequelizeUtils.value(
            this,
            'minimum_trading_unit',
            '',
          ).replace('  ', ' ');
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
      indexes: [],
      underscored: true,
      timestamps: false,
    },
  );

  broker_minimum_trading_unit.associate = (models) => {
    models.broker_minimum_trading_unit.belongsTo(
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

  return broker_minimum_trading_unit;
}
