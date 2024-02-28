import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const affiliate_link_heartbeat = sequelize.define(
    'affiliate_link_heartbeat',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
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
      paranoid: true,
    },
  );
  affiliate_link_heartbeat.associate = (models) => {
    models.affiliate_link_heartbeat.belongsTo(
      models.affiliate_link,
      {
        constraints: true,
        foreignKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    );
  };
  return affiliate_link_heartbeat;
}
