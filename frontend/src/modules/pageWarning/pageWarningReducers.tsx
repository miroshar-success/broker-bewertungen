import list from 'src/modules/pageWarning/list/pageWarningListReducers';
import form from 'src/modules/pageWarning/form/pageWarningFormReducers';
import view from 'src/modules/pageWarning/view/pageWarningViewReducers';
import destroy from 'src/modules/pageWarning/destroy/pageWarningDestroyReducers';
import importerReducer from 'src/modules/pageWarning/importer/pageWarningImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
