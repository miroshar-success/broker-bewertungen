import Roles from '../../security/roles';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize, DataTypes) {
  const tenantUser = sequelize.define(
    'tenantUser',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      roles: {
        type: SequelizeArrayUtils.DataType,
        validate: {
          isValidOption: function (value) {
            if (!value || !value.length) {
              return value;
            }

            const validOptions: any = Object.keys(
              Roles.values,
            );

            if (
              value.some(
                (item) => !validOptions.includes(item),
              )
            ) {
              throw new Error(
                `${value} is not a valid option`,
              );
            }

            return value;
          },
        },
        get() {
          return SequelizeArrayUtils.toJSON(
            this,
            'roles',
            [],
          );
        },
      },
      invitationToken: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [
            ['active', 'invited', 'empty-permissions'],
          ],
        },
      },
    },
    {
      timestamps: true,
    },
  );

  tenantUser.associate = (models) => {
    models.tenantUser.belongsTo(models.tenant, {
      foreignKey: {
        allowNull: false,
      },
    });

    models.tenantUser.belongsTo(models.user, {
      foreignKey: {
        allowNull: false,
      },
    });

    models.tenantUser.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.tenantUser.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return tenantUser;
}
