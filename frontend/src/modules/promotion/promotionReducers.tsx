import home from 'src/modules/promotion/home/promotionHomeReducers';
import list from 'src/modules/promotion/list/promotionListReducers';
import form from 'src/modules/promotion/form/promotionFormReducers';
import view from 'src/modules/promotion/view/promotionViewReducers';
import destroy from 'src/modules/promotion/destroy/promotionDestroyReducers';
import importerReducer from 'src/modules/promotion/importer/promotionImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
