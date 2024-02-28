import { DataTypes } from 'sequelize';
import SequelizeArrayUtils from '../utils/sequelizeArrayUtils';

export default function (sequelize) {
  const blog_entries_broker = sequelize.define(
    'blog_entries_broker',
    {
      blog_entry_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
      },
      broker_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
      },
    },
    {
      indexes: [
        {
          fields: ['broker_id'],
          name: 'blog_entries_brokers_brokers_id_fk',
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  blog_entries_broker.associate = (models) => {
    models.blog_entries_broker.belongsTo(
      models.blog_entry,
      {
        as: 'blog_entry',
        constraints: true,
        foreignKey: 'blog_entry_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );
    models.blog_entries_broker.belongsTo(models.broker, {
      as: 'broker',
      constraints: true,
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return blog_entries_broker;
}
