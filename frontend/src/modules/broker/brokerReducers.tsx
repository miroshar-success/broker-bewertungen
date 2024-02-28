import comparable from 'src/modules/broker/comparable/brokerComparableReducers';
import comparison from 'src/modules/broker/comparison/brokerComparisonReducers';
import featured from 'src/modules/broker/featured/brokerFeaturedReducers';
import top from 'src/modules/broker/top/brokerTopReducers';
import home from 'src/modules/broker/home/brokerHomeReducers';
import list from 'src/modules/broker/list/brokerListReducers';
import form from 'src/modules/broker/form/brokerFormReducers';
import view from 'src/modules/broker/view/brokerViewReducers';
import destroy from 'src/modules/broker/destroy/brokerDestroyReducers';
import importerReducer from 'src/modules/broker/importer/brokerImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  comparable,
  comparison,
  featured,
  top,
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
