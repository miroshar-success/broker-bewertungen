import Plans from '../../security/plans';

const plans = Plans.values;

export default function (sequelize, DataTypes) {
  const tenant = sequelize.define(
    'tenant',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validation: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      url: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validation: {
          notEmpty: true,
          len: [0, 50],
        },
      },
      plan: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [
            [plans.free, plans.growth, plans.enterprise],
          ],
        },
        defaultValue: plans.free,
      },
      planStatus: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          isIn: [
            ['active', 'cancel_at_period_end', 'error'],
          ],
        },
        defaultValue: 'active',
      },
      planStripeCustomerId: {
        type: DataTypes.STRING(255),
        validate: {
          len: [0, 255],
        },
      },
      planUserId: {
        type: DataTypes.UUID,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['url'],
          where: {
            deletedAt: null,
          },
        },
      ],
      timestamps: true,
    },
  );

  tenant.associate = (models) => {
    models.tenant.hasMany(models.settings, {
      as: 'settings',
    });

    models.tenant.hasMany(models.tenantUser, {
      as: 'users',
    });

    models.tenant.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.tenant.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return tenant;
}
