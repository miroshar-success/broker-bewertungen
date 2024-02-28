import list from 'src/modules/blog/list/blogListReducers';
import find from 'src/modules/blog/find/blogFindReducers';
import form from 'src/modules/blog/form/blogFormReducers';
import home from 'src/modules/blog/home/blogHomeReducers';
import view from 'src/modules/blog/view/blogViewReducers';
import destroy from 'src/modules/blog/destroy/blogDestroyReducers';
import importerReducer from 'src/modules/blog/importer/blogImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  find,
  form,
  home,
  view,
  destroy,
  importer: importerReducer,
});
