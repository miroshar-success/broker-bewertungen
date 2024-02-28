import { i18n, i18nHtml } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.blog.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.blog.fields.name'),
  },
  {
    name: 'link',
    label: i18n('entities.blog.fields.link'),
  },
  {
    name: 'pagetitle',
    label: i18n('entities.blog.fields.pagetitle'),
  },
  {
    name: 'metakeywords',
    label: i18n('entities.blog.fields.metakeywords'),
  },
  {
    name: 'metadescription',
    label: i18n('entities.blog.fields.metadescription'),
  },
  {
    name: 'teaser',
    label: i18n('entities.blog.fields.teaser'),
  },
  {
    name: 'content',
    label: i18n('entities.blog.fields.content'),
  },
  {
    name: 'activated',
    label: i18n('entities.blog.fields.activated'),
    render: exporterRenders.boolean(),
  },
];
