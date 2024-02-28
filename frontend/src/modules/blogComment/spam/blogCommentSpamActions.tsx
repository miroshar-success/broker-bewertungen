import listActions from 'src/modules/blogComment/list/blogCommentListActions';
import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BLOGCOMMENT_SPAM';

const blogCommentSpamActions = {
  SPAM_STARTED: `${prefix}_SPAM_STARTED`,
  SPAM_SUCCESS: `${prefix}_SPAM_SUCCESS`,
  SPAM_ERROR: `${prefix}_SPAM_ERROR`,

  SPAM_ALL_STARTED: `${prefix}_SPAM_ALL_STARTED`,
  SPAM_ALL_SUCCESS: `${prefix}_SPAM_ALL_SUCCESS`,
  SPAM_ALL_ERROR: `${prefix}_SPAM_ALL_ERROR`,

  doSpam:
    (id, redirect_url = '/admin/blog-comment') =>
    async (dispatch) => {
      try {
        dispatch({
          type: blogCommentSpamActions.SPAM_STARTED,
        });

        await BlogCommentService.spamAll([id]);

        dispatch({
          type: blogCommentSpamActions.SPAM_SUCCESS,
        });

        Message.success(
          i18n('entities.blogComment.spam.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());
        getHistory().push(redirect_url);
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: blogCommentSpamActions.SPAM_ERROR,
        });
      }
    },

  doSpamAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: blogCommentSpamActions.SPAM_ALL_STARTED,
      });

      await BlogCommentService.spamAll(ids);

      dispatch({
        type: blogCommentSpamActions.SPAM_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.blogComment.spamAll.success'),
      );

      getHistory().push('/admin/blog-comment');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: blogCommentSpamActions.SPAM_ALL_ERROR,
      });
    }
  },
};

export default blogCommentSpamActions;
