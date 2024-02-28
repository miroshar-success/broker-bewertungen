import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.navigation.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'parent',
    label: i18n('entities.navigation.fields.parent'),
    render: exporterRenders.relationToOne('name'),
  },
  {
    name: 'name',
    label: i18n('entities.navigation.fields.name'),
  },
  {
    name: 'title',
    label: i18n('entities.navigation.fields.title'),
  },
  {
    name: 'link',
    label: i18n('entities.navigation.fields.link'),
  },
  {
    name: 'target',
    label: i18n('entities.navigation.fields.target'),
  },
  {
    name: 'type',
    label: i18n('entities.navigation.fields.type'),
  },
  {
    name: 'sort',
    label: i18n('entities.navigation.fields.sort'),
  },
  {
    name: 'activated',
    label: i18n('entities.navigation.fields.activated'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'show_user_logged_in',
    label: i18n(
      'entities.navigation.fields.show_user_logged_in',
    ),
    render: exporterRenders.boolean(),
  },
  {
    name: 'show_in_navigation',
    label: i18n(
      'entities.navigation.fields.show_in_navigation',
    ),
    render: exporterRenders.boolean(),
  },
];
