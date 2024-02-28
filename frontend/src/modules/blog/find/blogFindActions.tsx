import BlogService from 'src/modules/blog/blogService';
import selectors from 'src/modules/blog/home/blogHomeSelectors';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BLOG_FIND_LIST';

const blogFindActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (url) => async (dispatch) => {
    try {
      dispatch({
        type: blogFindActions.FIND_STARTED,
      });

      let record = await BlogService.findByURL(url);

      if (record === '') {
        record = null;
      }

      dispatch({
        type: blogFindActions.FIND_SUCCESS,
        payload: record,
      });

      if (!record) {
        getHistory().push('/404');
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogFindActions.FIND_ERROR,
      });
    }
  },
};

export default blogFindActions;
