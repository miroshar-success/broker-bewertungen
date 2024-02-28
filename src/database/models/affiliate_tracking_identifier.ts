import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const affiliate_tracking_identifier = sequelize.define(
    'affiliate_tracking_identifier',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          len: [0, 20],
        },
      },
      param: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      value: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      ip: {
        type: DataTypes.CHAR(39),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 29],
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
  affiliate_tracking_identifier.associate = (models) => {
    // models.affiliate_tracking_identifier.belongsTo(models.affiliate_tracking_identifier_heartbeat, {
    //   as: 'affiliate_tracking_identifier_heartbeat',
    //   constraints: true,
    //   foreignKey: 'affiliate_id',
    //   onDelete: 'NO ACTION',
    //   onUpdate: 'NO ACTION',
    // });
  };

  return affiliate_tracking_identifier;
}
