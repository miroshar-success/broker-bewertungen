import { i18n, i18nHtml } from 'src/i18n';
import exporterRenders from 'src/modules/shared/exporter/exporterRenders';

export default [
  {
    name: 'id',
    label: i18n('entities.expertAdvisorTest.fields.id'),
    render: exporterRenders.decimal(),
  },
  {
    name: 'navigation_id',
    label: i18n(
      'entities.expertAdvisorTest.fields.navigation',
    ),
  },
  {
    name: 'broker_id',
    label: i18n('entities.expertAdvisorTest.fields.broker'),
  },
  {
    name: 'name',
    label: i18n('entities.expertAdvisorTest.fields.name'),
  },
  {
    name: 'balance',
    label: i18n(
      'entities.expertAdvisorTest.fields.balance',
    ),
  },
  {
    name: 'deposit',
    label: i18n(
      'entities.expertAdvisorTest.fields.deposit',
    ),
  },
  {
    name: 'closed_profit_loss',
    label: i18n(
      'entities.expertAdvisorTest.fields.closed_profit_loss',
    ),
  },
  {
    name: 'start_date',
    label: i18n(
      'entities.expertAdvisorTest.fields.start_date',
    ),
  },
  {
    name: 'activated',
    label: i18n(
      'entities.expertAdvisorTest.fields.activated',
    ),
  },
  {
    name: 'pdf',
    label: i18n('entities.expertAdvisorTest.fields.pdf'),
    render: exporterRenders.boolean(),
  },
  {
    name: 'author_name',
    label: i18n('entities.expertAdvisorTest.fields.author'),
  },
];
