import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_rating = sequelize.define(
    'broker_rating',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: false,
        primaryKey: true,
      },
      overall_rating: {
        type: DataTypes.DOUBLE(10, 9).UNSIGNED,
        allowNull: false,
      },
      overall_reviews: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      rated_reviews: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      last_modified: {
        type: DataTypes.DATE,
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

  broker_rating.associate = (models) => {
    models.broker_rating.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_rating;
}
