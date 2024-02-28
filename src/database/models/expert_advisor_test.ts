import { DataTypes } from 'sequelize';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const expert_advisor_test = sequelize.define(
    'expert_advisor_test',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        validate: {
          notEmpty: true,
        },
      },
      navigation_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
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
          notEmpty: true,
          len: [0, 255],
        },
      },
      deposit: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          notEmpty: true,
          len: [0, 10],
        },
      },
      balance: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [0, 10],
        },
      },
      closed_profit_loss: {
        type: DataTypes.DOUBLE(10, 2),
        allowNull: false,
        defaultValue: 0,
        validate: {
          len: [0, 10],
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
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: '0000-00-00',
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
          name: 'navigation_id',
          fields: ['navigation_id'],
        },
        {
          name: 'broker_id',
          fields: ['broker_id'],
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  expert_advisor_test.associate = (models) => {
    models.expert_advisor_test.belongsTo(
      models.navigation,
      {
        as: 'navigation',
        constraints: true,
        foreignKey: 'navigation_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );

    models.expert_advisor_test.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.expert_advisor_test.belongsTo(
      models.expert_advisor_test_metas,
      {
        as: 'expert_advisor_test_metas',
        constraints: true,
        foreignKey: 'id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );

    models.expert_advisor_test.hasMany(models.file, {
      as: 'expert_advisor_test_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo:
          models.expert_advisor_test.getTableName(),
        belongsToColumn: 'expert_advisor_test_image',
      },
    });
  };

  return expert_advisor_test;
}
