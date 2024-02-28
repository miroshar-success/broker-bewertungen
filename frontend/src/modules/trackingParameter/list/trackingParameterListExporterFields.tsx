import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.trackingParameter.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'param',
    label: i18n('entities.trackingParameter.fields.param'),
  },
  {
    name: 'value',
    label: i18n('entities.trackingParameter.fields.value'),
  },
];
