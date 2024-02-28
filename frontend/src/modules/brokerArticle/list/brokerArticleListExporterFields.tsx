import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.brokerArticle.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.brokerArticle.fields.name'),
  },
  {
    name: 'name_normalized',
    label: i18n(
      'entities.brokerArticle.fields.name_normalized',
    ),
  },
  {
    name: 'pagetitle',
    label: i18n('entities.brokerArticle.fields.pagetitle'),
  },
  {
    name: 'metadescription',
    label: i18n(
      'entities.brokerArticle.fields.metadescription',
    ),
  },
  {
    name: 'metakeywords',
    label: i18n(
      'entities.brokerArticle.fields.metakeywords',
    ),
  },
  {
    name: 'author_name',
    label: i18n(
      'entities.brokerArticle.fields.author_name',
    ),
  },
  {
    name: 'author_link',
    label: i18n(
      'entities.brokerArticle.fields.author_link',
    ),
  },
  {
    name: 'activated',
    label: i18n('entities.brokerArticle.fields.activated'),
    render: exporterRenders.boolean(),
  },
];
