import forexStrategy from 'src/modules/navigation/forexStrategy/navigationForexStrategyReducers';
import forexSchool from 'src/modules/navigation/forexSchool/navigationForexSchoolReducers';
import mostRead from 'src/modules/navigation/mostRead/navigationMostReadReducers';
import home from 'src/modules/navigation/home/navigationHomeReducers';
import list from 'src/modules/navigation/list/navigationListReducers';
import form from 'src/modules/navigation/form/navigationFormReducers';
import view from 'src/modules/navigation/view/navigationViewReducers';
import destroy from 'src/modules/navigation/destroy/navigationDestroyReducers';
import importerReducer from 'src/modules/navigation/importer/navigationImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  forexStrategy,
  forexSchool,
  mostRead,
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
