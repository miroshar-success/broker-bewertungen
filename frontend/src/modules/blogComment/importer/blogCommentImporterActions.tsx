import importerActions from 'src/modules/shared/importer/importerActions';
import selectors from 'src/modules/blogComment/importer/blogCommentImporterSelectors';
import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import fields from 'src/modules/blogComment/importer/blogCommentImporterFields';
import { i18n } from 'src/i18n';

const blogCommentImporterActions = importerActions(
  'BLOGCOMMENT_IMPORTER',
  selectors,
  BlogCommentService.import,
  fields,
  i18n('entities.blogComment.importer.fileName'),
);

export default blogCommentImporterActions;
