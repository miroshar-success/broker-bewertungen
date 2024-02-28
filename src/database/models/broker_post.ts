import { DataTypes } from 'sequelize';

export default function (sequelize) {
  const broker_post = sequelize.define(
    'broker_post',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      review: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      rating: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      spam: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      review_required: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      user_agent: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      referer: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 255],
        },
      },
      ip_created: {
        type: DataTypes.CHAR(39),
        allowNull: false,
        defaultValue: '',
        validate: {
          len: [0, 39],
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
          name: 'created',
          fields: ['created'],
        },
        {
          name: 'parent_id',
          fields: ['parent_id'],
        },
        {
          name: 'broker_id',
          fields: ['broker_id'],
        },
        {
          name: 'user_id',
          fields: ['user_id'],
        },
        {
          fields: ['deleted', 'spam', 'review_required'],
          name: 'deleted_spam_review_required',
        },
        {
          name: 'rating',
          fields: ['rating'],
        },
        {
          fields: ['deleted', 'spam', 'review_required'],
          name: 'broker_posts_deleted_spam_review_required',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  broker_post.associate = (models) => {
    models.broker_post.belongsTo(models.broker_post, {
      constraints: true,
      foreignKey: 'parent_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker_post.belongsTo(models.broker, {
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker_post.belongsTo(models.user, {
      constraints: true,
      foreignKey: 'user_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker_post.hasMany(models.broker_post, {
      as: 'children',
      foreignKey: 'parent_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker_post;
}
