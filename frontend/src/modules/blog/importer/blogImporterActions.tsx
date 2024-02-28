import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/blog/importer/blogImporterSelectors';
import BlogService from 'src/modules/blog/blogService';
import fields from 'src/modules/blog/importer/blogImporterFields';
import { i18n } from 'src/i18n';

const blogImporterActions = importerActions(
  'BLOG_IMPORTER',
  selectors,
  BlogService.import,
  fields,
  i18n('entities.blog.importer.fileName'),
);

export default blogImporterActions;
