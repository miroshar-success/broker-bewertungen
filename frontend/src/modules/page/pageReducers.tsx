import home from 'src/modules/page/home/pageHomeReducers';
import list from 'src/modules/page/list/pageListReducers';
import form from 'src/modules/page/form/pageFormReducers';
import view from 'src/modules/page/view/pageViewReducers';
import destroy from 'src/modules/page/destroy/pageDestroyReducers';
import importerReducer from 'src/modules/page/importer/pageImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
