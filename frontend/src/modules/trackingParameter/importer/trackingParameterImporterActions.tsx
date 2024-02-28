import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/trackingParameter/importer/trackingParameterImporterSelectors';
import TrackingParameterService from 'src/modules/trackingParameter/trackingParameterService';
import fields from 'src/modules/trackingParameter/importer/trackingParameterImporterFields';
import { i18n } from 'src/i18n';

const trackingParameterImporterActions = importerActions(
  'TRACKING_PARAMETER_IMPORTER',
  selectors,
  TrackingParameterService.import,
  fields,
  i18n('entities.trackingParameter.importer.fileName'),
);

export default trackingParameterImporterActions;
