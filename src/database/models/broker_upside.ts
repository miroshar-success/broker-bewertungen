import { DataTypes } from 'sequelize';
import BrokerUpsideRepository from '../repositories/brokerUpsideRepository';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const broker_upside = sequelize.define(
    'broker_upside',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null,
      },
      type: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
        get() {
          return SequelizeArrayUtils.indexToValue(
            this,
            'type',
            BrokerUpsideRepository.TYPES,
          );
        },
      },
      text: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
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

  broker_upside.associate = (models) => {
    models.broker_upside.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_upside;
}
