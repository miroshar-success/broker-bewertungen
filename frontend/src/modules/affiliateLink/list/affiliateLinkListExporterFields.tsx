import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.affiliateLink.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'hash',
    label: i18n('entities.affiliateLink.fields.hash'),
  },
  {
    name: 'link',
    label: i18n('entities.affiliateLink.fields.link'),
  },
  {
    name: 'display_hash',
    label: i18n(
      'entities.affiliateLink.fields.display_hash',
    ),
  },
  {
    name: 'meta_info',
    label: i18n('entities.affiliateLink.fields.meta_info'),
  },
];
