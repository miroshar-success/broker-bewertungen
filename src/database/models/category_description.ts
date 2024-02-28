import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const category_description = sequelize.define(
    'category_description',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      teaser: {
        type: DataTypes.TEXT('medium'),
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT('medium'),
        allowNull: false,
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
  category_description.associate = (models) => {
    models.category_description.belongsTo(models.category, {
      constraints: true,
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };
  return category_description;
}
