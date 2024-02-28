export default function (sequelize, DataTypes) {
  const file = sequelize.define(
    'file',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      belongsTo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      belongsToId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null,
      },
      belongsToColumn: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      name: {
        type: DataTypes.STRING(2083),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 2083],
        },
      },
      type: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      link: {
        type: DataTypes.STRING(2083),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 2083],
        },
      },
      linkTitle: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      sizeInBytes: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      privateUrl: {
        type: DataTypes.STRING(2083),
        allowNull: true,
        validate: {
          len: [0, 2083],
        },
      },
      publicUrl: {
        type: DataTypes.STRING(2083),
        allowNull: true,
        validate: {
          len: [0, 2083],
        },
      },
    },
    {
      indexes: [
        {
          name: 'belongsTo',
          fields: ['belongsTo'],
        },
        {
          name: 'belongsToId',
          fields: ['belongsToId'],
        },
        {
          name: 'type',
          fields: ['type'],
        },
      ],
      timestamps: true,
    },
  );

  file.associate = (models) => {
    models.file.belongsTo(models.tenant, {
      as: 'tenant',
    });

    models.file.belongsTo(models.user, {
      as: 'createdBy',
    });

    models.file.belongsTo(models.user, {
      as: 'updatedBy',
    });
  };

  return file;
}
