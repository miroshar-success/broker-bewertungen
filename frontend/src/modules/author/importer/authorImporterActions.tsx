import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/author/importer/authorImporterSelectors';
import AuthorService from 'src/modules/author/authorService';
import fields from 'src/modules/author/importer/authorImporterFields';
import { i18n } from 'src/i18n';

const authorImporterActions = importerActions(
  'AUTHOR_IMPORTER',
  selectors,
  AuthorService.import,
  fields,
  i18n('entities.author.importer.fileName'),
);

export default authorImporterActions;
