import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.category.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'name',
    label: i18n('entities.category.fields.name'),
  },
  {
    name: 'title',
    label: i18n('entities.category.fields.title'),
  },
  {
    name: 'link',
    label: i18n('entities.category.fields.link'),
  },
  {
    name: 'author_name',
    label: i18n('entities.category.fields.author_name'),
  },
  {
    name: 'author_link',
    label: i18n('entities.category.fields.author_link'),
  },
  {
    name: 'target',
    label: i18n('entities.category.fields.target'),
  },
  {
    name: 'sort',
    label: i18n('entities.category.fields.sort'),
  },
  {
    name: 'activated',
    label: i18n('entities.category.fields.activated'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'show_in_navigation',
    label: i18n(
      'entities.category.fields.show_in_navigation',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'show_in_footer',
    label: i18n('entities.category.fields.show_in_footer'),
    render: exporterRenders.boolean(),
  },
];
