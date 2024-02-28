import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_dynamic_field = sequelize.define(
    'broker_dynamic_field',
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
      type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 50],
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
      value: {
        type: DataTypes.TEXT,
        allowNull: false,
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

  broker_dynamic_field.associate = (models) => {
    models.broker_dynamic_field.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_dynamic_field;
}
