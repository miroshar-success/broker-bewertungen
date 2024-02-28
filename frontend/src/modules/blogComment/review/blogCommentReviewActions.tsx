import listActions from 'src/modules/blogComment/list/blogCommentListActions';
import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BLOGCOMMENT_REVIEW';

const blogCommentReviewActions = {
  REVIEW_STARTED: `${prefix}_REVIEW_STARTED`,
  REVIEW_SUCCESS: `${prefix}_REVIEW_SUCCESS`,
  REVIEW_ERROR: `${prefix}_REVIEW_ERROR`,

  REVIEW_ALL_STARTED: `${prefix}_REVIEW_ALL_STARTED`,
  REVIEW_ALL_SUCCESS: `${prefix}_REVIEW_ALL_SUCCESS`,
  REVIEW_ALL_ERROR: `${prefix}_REVIEW_ALL_ERROR`,

  doReview:
    (id, redirect_url = '/admin/blog-comment') =>
    async (dispatch) => {
      try {
        dispatch({
          type: blogCommentReviewActions.REVIEW_STARTED,
        });

        await BlogCommentService.reviewAll([id]);

        dispatch({
          type: blogCommentReviewActions.REVIEW_SUCCESS,
        });

        Message.success(
          i18n('entities.blogComment.review.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());
        getHistory().push(redirect_url);
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: blogCommentReviewActions.REVIEW_ERROR,
        });
      }
    },

  doReviewAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: blogCommentReviewActions.REVIEW_ALL_STARTED,
      });

      await BlogCommentService.reviewAll(ids);

      dispatch({
        type: blogCommentReviewActions.REVIEW_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.blogComment.reviewAll.success'),
      );

      getHistory().push('/admin/blog-comment');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: blogCommentReviewActions.REVIEW_ALL_ERROR,
      });
    }
  },
};

export default blogCommentReviewActions;
