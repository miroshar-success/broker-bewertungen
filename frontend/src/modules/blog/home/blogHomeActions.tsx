import BlogService from 'src/modules/blog/blogService';
import selectors from 'src/modules/blog/home/blogHomeSelectors';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BLOG_HOME_LIST';

const blogHomeActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: blogHomeActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(blogHomeActions.doFetch());
    },

  doFetch:
    (keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: blogHomeActions.FETCH_STARTED,
          payload: { keepPagination },
        });

        let response = await BlogService.findBlogList(
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        if (response === '') {
          response = null;
        }

        dispatch({
          type: blogHomeActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });

        if (!response) {
          getHistory().push('/404');
        }
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: blogHomeActions.FETCH_ERROR,
        });
      }
    },
};

export default blogHomeActions;
