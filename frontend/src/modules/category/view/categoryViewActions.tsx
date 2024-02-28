import CategoryService from 'src/modules/category/categoryService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'CATEGORY_VIEW';

const categoryViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: categoryViewActions.FIND_STARTED,
      });

      const record = await CategoryService.find(id);

      dispatch({
        type: categoryViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: categoryViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/category');
    }
  },
};

export default categoryViewActions;
