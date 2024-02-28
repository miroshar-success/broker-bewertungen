import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const affiliate_link = sequelize.define(
    'affiliate_link',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        validate: {
          len: [0, 29],
        },
      },
      hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      link: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      display_hash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      meta_info: {
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
          fields: ['hash'],
          name: 'hash',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );
  affiliate_link.associate = (models) => {
    // models.affiliate_link.belongsTo(models.affiliate_link_heartbeat, {
    //   as: 'affiliate_link_heartbeat',
    //   constraints: true,
    //   foreignKey: 'affiliate_id',
    //   onDelete: 'NO ACTION',
    //   onUpdate: 'NO ACTION',
    // });
  };

  return affiliate_link;
}
