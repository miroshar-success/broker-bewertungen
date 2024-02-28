import BlogService from 'src/modules/blog/blogService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BLOG_VIEW';

const blogViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: blogViewActions.FIND_STARTED,
      });

      const record = await BlogService.find(id);

      dispatch({
        type: blogViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/blog');
    }
  },
};

export default blogViewActions;
