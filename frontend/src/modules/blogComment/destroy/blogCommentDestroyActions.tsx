import listActions from 'src/modules/blogComment/list/blogCommentListActions';
import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BLOGCOMMENT_DESTROY';

const blogCommentDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy:
    (id, redirect_url = '/admin/blog-comment') =>
    async (dispatch) => {
      try {
        dispatch({
          type: blogCommentDestroyActions.DESTROY_STARTED,
        });

        await BlogCommentService.destroyAll([id]);

        dispatch({
          type: blogCommentDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n('entities.blogComment.destroy.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());

        getHistory().push(redirect_url);
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: blogCommentDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: blogCommentDestroyActions.DESTROY_ALL_STARTED,
      });

      await BlogCommentService.destroyAll(ids);

      dispatch({
        type: blogCommentDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.blogComment.destroyAll.success'),
      );

      getHistory().push('/admin/blog-comment');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: blogCommentDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default blogCommentDestroyActions;
