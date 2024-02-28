import sidebar from 'src/modules/category/sidebar/categorySidebarReducers';
import footer from 'src/modules/category/footer/categoryFooterReducers';
import home from 'src/modules/category/home/categoryHomeReducers';
import list from 'src/modules/category/list/categoryListReducers';
import form from 'src/modules/category/form/categoryFormReducers';
import view from 'src/modules/category/view/categoryViewReducers';
import destroy from 'src/modules/category/destroy/categoryDestroyReducers';
import importerReducer from 'src/modules/category/importer/categoryImporterReducers';
import { combineReducers } from 'redux';

export default combineReducers({
  sidebar,
  footer,
  home,
  list,
  form,
  view,
  destroy,
  importer: importerReducer,
});
