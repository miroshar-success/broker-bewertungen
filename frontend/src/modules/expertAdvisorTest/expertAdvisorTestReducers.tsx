import list from 'src/modules/expertAdvisorTest/list/expertAdvisorTestListReducers';
import form from 'src/modules/expertAdvisorTest/form/expertAdvisorTestFormReducers';
import view from 'src/modules/expertAdvisorTest/view/expertAdvisorTestViewReducers';
import destroy from 'src/modules/expertAdvisorTest/destroy/expertAdvisorTestDestroyReducers';
import importerReducer from 'src/modules/expertAdvisorTest/importer/expertAdvisorTestImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
