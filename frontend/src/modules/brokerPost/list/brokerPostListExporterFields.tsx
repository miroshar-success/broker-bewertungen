import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.brokerPost.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.brokerPost.fields.name'),
  },
  {
    name: 'email',
    label: i18n('entities.brokerPost.fields.email'),
  },
  {
    name: 'rating',
    label: i18n('entities.brokerPost.fields.rating'),
  },
  {
    name: 'created',
    label: i18n('entities.brokerPost.fields.created'),
  },
  {
    name: 'review',
    label: i18n('entities.brokerPost.fields.review'),
  },
];
