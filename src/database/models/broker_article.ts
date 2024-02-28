import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_article = sequelize.define(
    'broker_article',
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
      name_normalized: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      author_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
        defaultValue: null,
      },
      author_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      author_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      pagetitle: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      metadescription: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      metakeywords: {
        type: DataTypes.STRING(255),
        allowNull: true,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
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
          name: 'activated',
          fields: ['activated'],
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  broker_article.associate = (models) => {
    models.broker_article.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker_article.belongsTo(models.author, {
      as: 'author',
      constraints: true,
      foreignKey: 'author_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_article;
}
