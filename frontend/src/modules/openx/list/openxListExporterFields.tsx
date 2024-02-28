import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.openx.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'code',
    label: i18n('entities.openx.fields.code'),
  },
  {
    name: 'noscript',
    label: i18n('entities.openx.fields.noscript'),
  },
  {
    name: 'zone',
    label: i18n('entities.openx.fields.zone'),
  },
  {
    name: 'activated',
    label: i18n('entities.openx.fields.activated'),
    render: exporterRenders.boolean(),
  },
];
