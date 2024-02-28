import home from 'src/modules/author/home/authorHomeReducers';
import list from 'src/modules/author/list/authorListReducers';
import form from 'src/modules/author/form/authorFormReducers';
import view from 'src/modules/author/view/authorViewReducers';
import destroy from 'src/modules/author/destroy/authorDestroyReducers';
import importerReducer from 'src/modules/author/importer/authorImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
