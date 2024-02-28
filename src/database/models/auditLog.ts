export default function (sequelize, DataTypes) {
  const auditLog = sequelize.define(
    'auditLog',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      entityName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      entityId: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          len: [0, 255],
        },
      },
      tenantId: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      action: {
        type: DataTypes.STRING(32),
        allowNull: false,
        validate: {
          len: [0, 32],
        },
      },
      createdById: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      createdByEmail: {
        type: DataTypes.STRING(255),
        validate: {
          len: [0, 255],
        },
        allowNull: true,
      },
      timestamp: { type: DataTypes.DATE, allowNull: false },
      values: { type: DataTypes.JSON, allowNull: false },
    },
    {
      timestamps: false,
    },
  );

  auditLog.associate = (models) => {};

  return auditLog;
}
