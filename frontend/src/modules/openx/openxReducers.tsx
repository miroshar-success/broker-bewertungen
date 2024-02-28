import list from 'src/modules/openx/list/openxListReducers';
import form from 'src/modules/openx/form/openxFormReducers';
import view from 'src/modules/openx/view/openxViewReducers';
import destroy from 'src/modules/openx/destroy/openxDestroyReducers';
import importerReducer from 'src/modules/openx/importer/openxImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
