import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const mui = sequelize.define(
    'mui',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      miniSidenav: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {},
      },
      transparentSidenav: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {},
      },
      whiteSidenav: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {},
      },
      sidenavColor: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          len: [1, 32],
          notEmpty: true,
        },
      },
      transparentNavbar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {},
      },
      fixedNavbar: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {},
      },
      direction: {
        type: DataTypes.STRING(4),
        allowNull: false,
        validate: {
          len: [1, 4],
          notEmpty: true,
        },
      },
      darkMode: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {},
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['userId', 'tenantId'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
    },
  );

  mui.associate = (models) => {
    models.mui.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.mui.belongsTo(models.user, {
      as: 'user',
    });

    models.mui.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.mui.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return mui;
}
