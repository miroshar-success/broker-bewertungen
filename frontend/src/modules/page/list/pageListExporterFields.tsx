import { i18n, i18nHtml } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.page.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'navigation_id',
    label: i18n('entities.page.fields.navigation'),
  },
  {
    name: 'link',
    label: i18n('entities.page.fields.link'),
  },
  {
    name: 'meta_keywords',
    label: i18n('entities.page.fields.meta_keywords'),
  },
  {
    name: 'meta_description',
    label: i18n('entities.page.fields.meta_description'),
  },
  {
    name: 'name',
    label: i18n('entities.page.fields.name'),
  },
  {
    name: 'title',
    label: i18n('entities.page.fields.title'),
  },
  {
    name: 'teaser',
    label: i18n('entities.page.fields.teaser'),
  },
  {
    name: 'body',
    label: i18n('entities.page.fields.body'),
  },
  {
    name: 'activated',
    label: i18n('entities.page.fields.activated'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'pdf',
    label: i18n('entities.page.fields.pdf'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'author_name',
    label: i18n('entities.page.fields.author'),
  },
  {
    name: 'page_warning',
    label: i18n('entities.page.fields.page_warning'),
  },
];
