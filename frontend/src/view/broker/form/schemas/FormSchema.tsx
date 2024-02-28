import { i18n } from 'src/i18n';
import * as yup from 'yup';
import yupFormSchemas from 'src/modules/shared/yup/yupFormSchemas';

const schema = yup.object().shape({
  // #region Broker
  // #region Broker Metadata
  demo_url: yupFormSchemas.string(
    i18n('entities.broker.fields.demo_url'),
    {
      min: 0,
      max: 255,
    },
  ),
  account_url: yupFormSchemas.string(
    i18n('entities.broker.fields.account_url'),
    {
      min: 0,
      max: 255,
    },
  ),
  maximum_leverage: yupFormSchemas.string(
    i18n('entities.broker.fields.maximum_leverage'),
    {
      min: 0,
      max: 255,
    },
  ),
  minimum_deposit_short: yupFormSchemas.string(
    i18n('entities.broker.fields.minimum_deposit_short'),
    {
      min: 0,
      max: 255,
    },
  ),
  custodian_fees: yupFormSchemas.boolean(
    i18n('entities.broker.fields.custodian_fees'),
  ),
  mobile_trading: yupFormSchemas.boolean(
    i18n('entities.broker.fields.mobile_trading'),
  ),
  phone_order: yupFormSchemas.boolean(
    i18n('entities.broker.fields.phone_order'),
  ),
  // #endregion
  navigation: yupFormSchemas.relationToOne(
    i18n('entities.broker.fields.navigation'),
    {
      required: true,
    },
  ),
  author: yupFormSchemas.relationToOne(
    i18n('entities.broker.fields.author'),
  ),
  // #region Broker's Categories
  categories: yupFormSchemas.relationToMany(
    i18n('entities.broker.fields.categories'),
  ),
  categories_in_top_lists: yupFormSchemas.relationToMany(
    i18n('entities.broker.fields.categories_in_top_lists'),
  ),
  // #endregion
  name: yupFormSchemas.string(
    i18n('entities.broker.fields.name'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  name_normalized: yupFormSchemas.string(
    i18n('entities.broker.fields.name_normalized'),
    {
      required: true,
      min: 1,
      max: 255,
    },
  ),
  activated: yupFormSchemas.boolean(
    i18n('entities.broker.fields.activated'),
  ),
  is_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.is_broker'),
  ),
  is_compareable: yupFormSchemas.boolean(
    i18n('entities.broker.fields.is_compareable'),
  ),
  top_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_broker'),
  ),
  top_binary_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_binary_broker'),
  ),
  top_forex_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.top_forex_broker'),
  ),
  featured_broker: yupFormSchemas.boolean(
    i18n('entities.broker.fields.featured_broker'),
  ),
  pdf: yupFormSchemas.boolean(
    i18n('entities.broker.fields.pdf'),
  ),
  // #endregion

  // #region Characteristics
  homepage: yupFormSchemas.string(
    i18n('entities.broker.fields.homepage'),
    {
      min: 0,
      max: 255,
    },
  ),

  // #region Phone
  phone: yupFormSchemas.string(
    i18n('entities.broker.fields.phone'),
    {
      min: 0,
      max: 255,
    },
  ),
  // #endregion

  // #region Fax
  fax: yupFormSchemas.string(
    i18n('entities.broker.fields.fax'),
    {
      min: 0,
      max: 255,
    },
  ),
  // #endregion

  // #region Email
  email: yupFormSchemas.email(
    i18n('entities.broker.fields.email'),
    {
      min: 0,
      max: 255,
    },
  ),
  // #endregion

  // #region Address
  address_line_0: yupFormSchemas.string(
    i18n('entities.broker.fields.address.line_0'),
    {
      min: 0,
      max: 255,
    },
  ),
  address_line_1: yupFormSchemas.string(
    i18n('entities.broker.fields.address.line_1'),
    {
      min: 0,
      max: 255,
    },
  ),
  address_line_2: yupFormSchemas.string(
    i18n('entities.broker.fields.address.line_2'),
    {
      min: 0,
      max: 255,
    },
  ),
  address_line_3: yupFormSchemas.string(
    i18n('entities.broker.fields.address.line_3'),
    {
      min: 0,
      max: 255,
    },
  ),
  address_line_4: yupFormSchemas.string(
    i18n('entities.broker.fields.address.line_4'),
    {
      min: 0,
      max: 255,
    },
  ),
  address_line_5: yupFormSchemas.string(
    i18n('entities.broker.fields.address.line_5'),
    {
      min: 0,
      max: 255,
    },
  ),
  // #endregion

  // #region Video
  youtube_hash: yupFormSchemas.string(
    i18n('entities.broker.fields.youtube_hash'),
    {
      min: 0,
      max: 255,
    },
  ),
  // #endregion

  // #endregion

  // #region Forex Signal
  forex_signal_prodiver: yupFormSchemas.string(
    i18n('entities.broker.fields.forex_signal.prodiver'),
    {
      min: 0,
      max: 255,
    },
  ),
  forex_signal_test_posibilities: yupFormSchemas.string(
    i18n(
      'entities.broker.fields.forex_signal.test_posibilities',
    ),
    {
      min: 0,
      max: 255,
    },
  ),
  // #endregion
});

export default schema;
