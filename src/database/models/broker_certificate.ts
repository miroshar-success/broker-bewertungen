import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_certificate = sequelize.define(
    'broker_certificate',
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
          len: [0, 255],
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

  broker_certificate.associate = (models) => {
    models.broker_certificate.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker_certificate.hasMany(models.file, {
      as: 'broker_certificate_image_certificate_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.broker_certificate.getTableName(),
        belongsToColumn:
          'broker_certificate_image_certificate_image',
      },
    });
  };

  return broker_certificate;
}
