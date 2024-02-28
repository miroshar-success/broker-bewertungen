import { DataTypes } from 'sequelize';
import { i18n } from '../../i18n';

export default function (sequelize) {
  const broker = sequelize.define(
    'broker',
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      navigation_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      name_normalized: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true,
          len: [0, 255],
        },
      },
      activated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_broker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_compareable: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      top_broker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      top_binary_broker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      top_forex_broker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      featured_broker: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      pdf: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      author_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: true,
      },
      author_name: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
      },
      author_link: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          len: [0, 255],
        },
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
      indexes: [
        {
          name: 'navigation_id',
          fields: ['navigation_id'],
        },
        {
          name: 'top_broker',
          fields: ['top_broker'],
        },
        {
          name: 'activated',
          fields: ['activated'],
        },
      ],
      underscored: true,
      timestamps: false,
    },
  );

  broker.associate = (models) => {
    models.broker.belongsTo(models.navigation, {
      as: 'navigation',
      constraints: true,
      foreignKey: 'navigation_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.belongsTo(models.author, {
      as: 'author',
      constraints: true,
      foreignKey: 'author_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.file, {
      as: 'broker_image_top_broker_logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.broker.getTableName(),
        belongsToColumn: 'broker_image_top_broker_logo',
      },
    });
    models.broker.hasMany(models.file, {
      as: 'broker_image_top_broker_horizontal_logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.broker.getTableName(),
        belongsToColumn:
          'broker_image_top_broker_horizontal_logo',
      },
    });
    models.broker.hasMany(models.file, {
      as: 'broker_image_broker_regulation_image',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.broker.getTableName(),
        belongsToColumn:
          'broker_image_broker_regulation_image',
      },
    });
    models.broker.hasMany(models.file, {
      as: 'broker_image_broker_logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.broker.getTableName(),
        belongsToColumn: 'broker_image_broker_logo',
      },
    });
    models.broker.hasMany(models.file, {
      as: 'broker_image_broker_detail_logo',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: models.broker.getTableName(),
        belongsToColumn: 'broker_image_broker_detail_logo',
      },
    });
    models.broker.hasOne(models.broker_metas, {
      as: 'meta',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_rating, {
      as: 'rating',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_phone, {
      as: 'phone',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_fax, {
      as: 'fax',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_email, {
      as: 'email',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_address, {
      as: 'address',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_video, {
      as: 'video',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_checkbox, {
      as: 'checkbox',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_creterias, {
      as: 'creteria',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasOne(models.broker_forex_signal, {
      as: 'forex_signal',
      foreignKey: 'id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });

    models.broker.hasMany(models.broker_upside, {
      as: 'upsides',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(
      models.broker_regulatory_authority,
      {
        as: 'regulatory_authorities',
        foreignKey: 'broker_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );
    models.broker.hasMany(models.broker_deposit_guarantee, {
      as: 'deposit_guarantees',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_certificate, {
      as: 'certificates',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_spread, {
      as: 'spreads',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_feature, {
      as: 'features',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_bank, {
      as: 'banks',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_order_type, {
      as: 'order_types',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(
      models.broker_minimum_trading_unit,
      {
        as: 'minimum_trading_units',
        foreignKey: 'broker_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
      },
    );
    models.broker.hasMany(models.broker_currency_pair, {
      as: 'currency_pairs',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_trade_platform, {
      as: 'trade_platforms',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_trade_store, {
      as: 'trade_stores',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
    models.broker.hasMany(models.broker_deposit, {
      as: 'deposits',
      foreignKey: 'broker_id',
      onDelete: 'NO ACTION',
      onUpdate: 'NO ACTION',
    });
  };

  return broker;
}
