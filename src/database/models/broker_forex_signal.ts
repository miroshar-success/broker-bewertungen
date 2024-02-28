import { DataTypes } from 'sequelize';
import BrokerForexSignalRepository from '../repositories/brokerForexSignalRepository';
import SequelizeUtils from '../utils/sequelizeUtils';

export default function (sequelize) {
  const broker_forex_signal = sequelize.define(
    'broker_forex_signal',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      prodiver: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      costs: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
        get() {
          return BrokerForexSignalRepository._textToArray(
            SequelizeUtils.value(this, 'costs'),
          );
        },
      },
      notifications: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
        get() {
          return BrokerForexSignalRepository._textToArray(
            SequelizeUtils.value(this, 'notifications'),
          );
        },
      },
      test_posibilities: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      test_posibilities_tick: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      traded_markets: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
        get() {
          return BrokerForexSignalRepository._textToArray(
            SequelizeUtils.value(this, 'traded_markets'),
          );
        },
      },
      investment_horizon: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
        get() {
          return BrokerForexSignalRepository._textToArray(
            SequelizeUtils.value(
              this,
              'investment_horizon',
            ),
          );
        },
      },
      beginners_level: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      trading_signal_amount: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
        get() {
          return BrokerForexSignalRepository._textToArray(
            SequelizeUtils.value(
              this,
              'trading_signal_amount',
            ),
          );
        },
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
      indexes: [],
      underscored: true,
      timestamps: false,
    },
  );

  broker_forex_signal.associate = (models) => {
    models.broker_forex_signal.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_forex_signal;
}
