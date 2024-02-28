import list from 'src/modules/news/list/newsListReducers';
import form from 'src/modules/news/form/newsFormReducers';
import view from 'src/modules/news/view/newsViewReducers';
import destroy from 'src/modules/news/destroy/newsDestroyReducers';
import importerReducer from 'src/modules/news/importer/newsImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
