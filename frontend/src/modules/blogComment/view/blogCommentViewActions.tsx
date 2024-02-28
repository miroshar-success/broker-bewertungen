import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BLOGCOMMENT_VIEW';

const blogCommentViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: blogCommentViewActions.FIND_STARTED,
      });

      const record = await BlogCommentService.find(id);

      dispatch({
        type: blogCommentViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogCommentViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/blog-comment');
    }
  },
};

export default blogCommentViewActions;
