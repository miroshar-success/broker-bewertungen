import { DataTypes } from 'sequelize';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const blog_comment = sequelize.define(
    'blog_comment',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      blog_entry_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: '',
      },
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: '',
        validate: {
          notEmpty: true,
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
        type: DataTypes.STRING(39),
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
          fields: ['blog_entry_id'],
          name: 'blog_entry_id',
        },
        {
          fields: ['user_id'],
          name: 'user_id',
        },
        {
          fields: ['created'],
          name: 'created',
        },
        {
          fields: ['deleted', 'spam', 'review_required'],
          name: 'deleted_spam_review_required',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  blog_comment.associate = (models) => {
    models.blog_comment.belongsTo(models.blog_entry, {
      as: 'blog_entry',
      constraints: true,
      foreignKey: 'blog_entry_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.blog_comment.belongsTo(models.user, {
      as: 'user',
      constraints: true,
      foreignKey: 'user_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return blog_comment;
}
