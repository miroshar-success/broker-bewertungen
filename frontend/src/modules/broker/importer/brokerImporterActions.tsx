import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/broker/importer/brokerImporterSelectors';
import BrokerService from 'src/modules/broker/brokerService';
import fields from 'src/modules/broker/importer/brokerImporterFields';
import { i18n } from 'src/i18n';

const brokerImporterActions = importerActions(
  'BROKER_IMPORTER',
  selectors,
  BrokerService.import,
  fields,
  i18n('entities.broker.importer.fileName'),
);

export default brokerImporterActions;
