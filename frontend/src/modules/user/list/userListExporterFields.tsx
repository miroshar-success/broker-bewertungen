import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('user.fields.id'),
  },
  {
    name: 'email',
    label: i18n('user.fields.email'),
  },
  {
    name: 'fullName',
    label: i18n('user.fields.fullName'),
  },
  {
    name: 'phoneNumber',
    label: i18n('user.fields.phoneNumber'),
  },
  {
    name: 'avatars',
    label: i18n('user.fields.avatars'),
    render: exporterRenders.filesOrImages(),
  },
  {
    name: 'roles',
    label: i18n('user.fields.roles'),
    render: exporterRenders.stringArray(),
  },
  {
    name: 'createdAt',
    label: i18n('user.fields.createdAt'),
    render: exporterRenders.datetime(),
  },
];
