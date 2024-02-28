import CategoryService from 'src/modules/category/categoryService';
import pageHomeActions from 'src/modules/page/home/pageHomeActions';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'CATEGORY_HOME';

const categoryHomeActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (url) => async (dispatch) => {
    try {
      dispatch({
        type: categoryHomeActions.FIND_STARTED,
      });

      let record = await CategoryService.findByURL(url);

      if (record === '') {
        record = null;
        dispatch(pageHomeActions.doFind(url));
      }

      dispatch({
        type: categoryHomeActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: categoryHomeActions.FIND_ERROR,
      });
    }
  },
};

export default categoryHomeActions;
