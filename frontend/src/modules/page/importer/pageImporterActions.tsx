import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/page/importer/pageImporterSelectors';
import PageService from 'src/modules/page/pageService';
import fields from 'src/modules/page/importer/pageImporterFields';
import { i18n } from 'src/i18n';

const pageImporterActions = importerActions(
  'PAGE_IMPORTER',
  selectors,
  PageService.import,
  fields,
  i18n('entities.page.importer.fileName'),
);

export default pageImporterActions;
