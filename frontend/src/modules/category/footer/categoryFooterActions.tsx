import CategoryService from 'src/modules/category/categoryService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'CATEGORY_FOOTER';

const categoryFooterActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: categoryFooterActions.FIND_STARTED,
      });

      let record =
        await CategoryService.categoriesInFooter();

      if (record === '') {
        record = null;
      }

      dispatch({
        type: categoryFooterActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: categoryFooterActions.FIND_ERROR,
      });
    }
  },
};

export default categoryFooterActions;
