import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.pageWarning.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'title',
    label: i18n('entities.pageWarning.fields.title'),
  },
  {
    name: 'body',
    label: i18n('entities.pageWarning.fields.body'),
  },
];
