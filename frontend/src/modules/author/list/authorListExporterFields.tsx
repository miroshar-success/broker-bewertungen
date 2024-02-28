import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.author.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.author.fields.name'),
  },
  {
    name: 'image',
    label: i18n('entities.author.fields.image'),
  },
  {
    name: 'link',
    label: i18n('entities.author.fields.link'),
  },
  {
    name: 'description',
    label: i18n('entities.author.fields.description'),
  },
];
