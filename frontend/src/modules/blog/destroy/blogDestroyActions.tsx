import listActions from 'src/modules/blog/list/blogListActions';
import BlogService from 'src/modules/blog/blogService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BLOG_DESTROY';

const blogDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: blogDestroyActions.DESTROY_STARTED,
      });

      await BlogService.destroyAll([id]);

      dispatch({
        type: blogDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.blog.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/blog');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: blogDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: blogDestroyActions.DESTROY_ALL_STARTED,
      });

      await BlogService.destroyAll(ids);

      dispatch({
        type: blogDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.blog.destroyAll.success'),
      );

      getHistory().push('/admin/blog');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: blogDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default blogDestroyActions;
