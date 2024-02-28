import { combineReducers } from 'redux';
import destroy from 'src/modules/blogComment/destroy/blogCommentDestroyReducers';
import form from 'src/modules/blogComment/form/blogCommentFormReducers';
import home from 'src/modules/blogComment/home/blogCommentHomeReducers';
import importerReducer from 'src/modules/blogComment/importer/blogCommentImporterReducers';
import list from 'src/modules/blogComment/list/blogCommentListReducers';
import review from 'src/modules/blogComment/review/blogCommentReviewReducers';
import spam from 'src/modules/blogComment/spam/blogCommentSpamReducers';
import view from 'src/modules/blogComment/view/blogCommentViewReducers';

export default combineReducers({
  destroy,
  form,
  home,
  list,
  review,
  spam,
  view,
  importer: importerReducer,
});
