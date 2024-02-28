import list from 'src/modules/brokerArticle/list/brokerArticleListReducers';
import form from 'src/modules/brokerArticle/form/brokerArticleFormReducers';
import home from 'src/modules/brokerArticle/home/brokerArticleHomeReducers';
import view from 'src/modules/brokerArticle/view/brokerArticleViewReducers';
import destroy from 'src/modules/brokerArticle/destroy/brokerArticleDestroyReducers';
import importerReducer from 'src/modules/brokerArticle/importer/brokerArticleImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  list,
  form,
  home,
  view,
  destroy,
  importer: importerReducer,
});
