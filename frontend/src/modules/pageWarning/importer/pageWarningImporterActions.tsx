import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/pageWarning/importer/pageWarningImporterSelectors';
import PageWarningService from 'src/modules/pageWarning/pageWarningService';
import fields from 'src/modules/pageWarning/importer/pageWarningImporterFields';
import { i18n } from 'src/i18n';

const pageWarningImporterActions = importerActions(
  'PAGE_WARNING_IMPORTER',
  selectors,
  PageWarningService.import,
  fields,
  i18n('entities.pageWarning.importer.fileName'),
);

export default pageWarningImporterActions;
