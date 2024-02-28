import list from 'src/modules/trackingParameter/list/trackingParameterListReducers';
import form from 'src/modules/trackingParameter/form/trackingParameterFormReducers';
import view from 'src/modules/trackingParameter/view/trackingParameterViewReducers';
import destroy from 'src/modules/trackingParameter/destroy/trackingParameterDestroyReducers';
import importerReducer from 'src/modules/trackingParameter/importer/trackingParameterImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
