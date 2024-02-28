import { i18n } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'timestamp',
    label: i18n('auditLog.fields.timestamp'),
    render: exporterRenders.datetime(),
  },
  {
    name: 'createdByEmail',
    label: i18n('auditLog.fields.createdByEmail'),
  },
  {
    name: 'entityName',
    label: i18n('auditLog.fields.entityName'),
  },
  {
    name: 'action',
    label: i18n('auditLog.fields.action'),
  },
  {
    name: 'entityId',
    label: i18n('auditLog.fields.entityId'),
  },
  {
    name: 'values',
    label: i18n('auditLog.fields.values'),
    render: exporterRenders.json(),
  },
  {
    name: 'id',
    label: i18n('auditLog.fields.id'),
  },
];
