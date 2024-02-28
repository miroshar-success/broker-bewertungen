import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.promotion.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.promotion.fields.name'),
  },
  {
    name: 'link',
    label: i18n('entities.promotion.fields.link'),
  },
  {
    name: 'activated',
    label: i18n('entities.promotion.fields.activated'),
    render: exporterRenders.boolean(),
  },
];
