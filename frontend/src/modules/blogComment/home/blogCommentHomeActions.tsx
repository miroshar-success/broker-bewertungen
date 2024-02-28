import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import selectors from 'src/modules/blogComment/home/blogCommentHomeSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BLOG_COMMENT_HOME';

const blogCommentHomeActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doChangePagination: (pagination) => async (dispatch) => {
    dispatch({
      type: blogCommentHomeActions.PAGINATION_CHANGED,
      payload: pagination,
    });

    dispatch(blogCommentHomeActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        blogCommentHomeActions.doFetch(
          filter,
          rawFilter,
          true,
        ),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: blogCommentHomeActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response =
          await BlogCommentService.findCommentList(
            filter,
            selectors.selectOrderBy(getState()),
            selectors.selectLimit(getState()),
            selectors.selectOffset(getState()),
          );

        dispatch({
          type: blogCommentHomeActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: blogCommentHomeActions.FETCH_ERROR,
        });
      }
    },
};

export default blogCommentHomeActions;
