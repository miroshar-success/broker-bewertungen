import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.blogComment.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.blogComment.fields.name'),
  },
  {
    name: 'email',
    label: i18n('entities.blogComment.fields.email'),
  },
];
