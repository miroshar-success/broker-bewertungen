import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.news.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'link',
    label: i18n('entities.news.fields.link'),
  },
  {
    name: 'meta_keywords',
    label: i18n('entities.news.fields.meta_keywords'),
  },
  {
    name: 'meta_description',
    label: i18n('entities.news.fields.meta_description'),
  },
  {
    name: 'name',
    label: i18n('entities.news.fields.name'),
  },
  {
    name: 'title',
    label: i18n('entities.news.fields.title'),
  },
  {
    name: 'teaser',
    label: i18n('entities.news.fields.teaser'),
  },
  {
    name: 'body',
    label: i18n('entities.news.fields.body'),
  },
  {
    name: 'target',
    label: i18n('entities.news.fields.target'),
  },
  {
    name: 'sort',
    label: i18n('entities.news.fields.sort'),
  },
  {
    name: 'activated',
    label: i18n('entities.news.fields.activated'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'pdf',
    label: i18n('entities.news.fields.pdf'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'frontpage',
    label: i18n('entities.news.fields.frontpage'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'page_warning_id',
    label: i18n('entities.news.fields.page_warning_id'),
    render: exporterRenders.decimal(),
  },
];
