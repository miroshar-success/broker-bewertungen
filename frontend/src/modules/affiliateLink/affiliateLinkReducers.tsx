import list from 'src/modules/affiliateLink/list/affiliateLinkListReducers';
import form from 'src/modules/affiliateLink/form/affiliateLinkFormReducers';
import view from 'src/modules/affiliateLink/view/affiliateLinkViewReducers';
import destroy from 'src/modules/affiliateLink/destroy/affiliateLinkDestroyReducers';
import importerReducer from 'src/modules/affiliateLink/importer/affiliateLinkImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
