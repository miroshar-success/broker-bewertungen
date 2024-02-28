import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_regulatory_authority = sequelize.define(
    'broker_regulatory_authority',
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
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      abbreviation: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: null,
        validate: {
          len: [0, 50],
        },
      },
      url: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
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

  broker_regulatory_authority.associate = (models) => {
    models.broker_regulatory_authority.belongsTo(
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

  return broker_regulatory_authority;
}
