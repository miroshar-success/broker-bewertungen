import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/navigation/importer/navigationImporterSelectors';
import NavigationService from 'src/modules/navigation/navigationService';
import fields from 'src/modules/navigation/importer/navigationImporterFields';
import { i18n } from 'src/i18n';

const navigationImporterActions = importerActions(
  'NAVIGATION_IMPORTER',
  selectors,
  NavigationService.import,
  fields,
  i18n('entities.navigation.importer.fileName'),
);

export default navigationImporterActions;
