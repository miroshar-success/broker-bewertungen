export default function (sequelize, DataTypes) {
  const settings = sequelize.define(
    'settings',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      theme: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      backgroundImageUrl: {
        type: DataTypes.STRING(1024),
      },
      logoUrl: {
        type: DataTypes.STRING(1024),
      },
    },
    {
      timestamps: true,
    },
  );

  settings.associate = (models) => {
    models.settings.hasMany(models.file, {
      as: 'logos',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.settings.getTableName(),
        belongsToColumn: 'logos',
      },
    });

    models.settings.hasMany(models.file, {
      as: 'backgroundImages',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.settings.getTableName(),
        belongsToColumn: 'backgroundImages',
      },
    });

    models.settings.belongsTo(models.tenant, {
      as: 'tenant',
      foreignKey: {
        allowNull: false,
      },
    });

    models.settings.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.settings.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return settings;
}
