import list from 'src/modules/user/list/userListReducers';
import form from 'src/modules/user/form/userFormReducers';
import view from 'src/modules/user/view/userViewReducers';
import importerReducer from 'src/modules/user/importer/userImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  importer: importerReducer,
});
