import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/category/importer/categoryImporterSelectors';
import CategoryService from 'src/modules/category/categoryService';
import fields from 'src/modules/category/importer/categoryImporterFields';
import { i18n } from 'src/i18n';

const categoryImporterActions = importerActions(
  'CATEGORY_IMPORTER',
  selectors,
  CategoryService.import,
  fields,
  i18n('entities.category.importer.fileName'),
);

export default categoryImporterActions;
