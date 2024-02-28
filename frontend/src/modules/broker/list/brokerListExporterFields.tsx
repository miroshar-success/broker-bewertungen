import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  // #region Base
  {
    name: 'id',
    label: i18n('entities.broker.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'navigation',
    label: i18n('entities.broker.fields.navigation'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'author',
    label: i18n('entities.broker.fields.author'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'name',
    label: i18n('entities.broker.fields.name'),
  },
  {
    name: 'name_normalized',
    label: i18n('entities.broker.fields.name_normalized'),
  },
  {
    name: 'activated',
    label: i18n('entities.broker.fields.activated'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'is_broker',
    label: i18n('entities.broker.fields.is_broker'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'is_compareable',
    label: i18n('entities.broker.fields.is_compareable'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'top_broker',
    label: i18n('entities.broker.fields.top_broker'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'top_binary_broker',
    label: i18n('entities.broker.fields.top_binary_broker'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'top_forex_broker',
    label: i18n('entities.broker.fields.top_forex_broker'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'featured_broker',
    label: i18n('entities.broker.fields.featured_broker'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'pdf',
    label: i18n('entities.broker.fields.pdf'),
    render: exporterRenders.boolean(),
  },
  // #endregion
];
