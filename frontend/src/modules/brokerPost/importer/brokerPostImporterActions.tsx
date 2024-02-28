import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/brokerPost/importer/brokerPostImporterSelectors';
import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import fields from 'src/modules/brokerPost/importer/brokerPostImporterFields';
import { i18n } from 'src/i18n';

const brokerPostImporterActions = importerActions(
  'BROKER_POST_IMPORTER',
  selectors,
  BrokerPostService.import,
  fields,
  i18n('entities.brokerPost.importer.fileName'),
);

export default brokerPostImporterActions;
