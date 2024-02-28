import BlogService from 'src/modules/blog/blogService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'BLOG_FORM';

const blogFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: blogFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BlogService.find(id);
      }

      dispatch({
        type: blogFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/blog');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: blogFormActions.CREATE_STARTED,
      });

      await BlogService.create(values);

      dispatch({
        type: blogFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('entities.blog.create.success'));

      getHistory().push('/admin/blog');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: blogFormActions.UPDATE_STARTED,
      });

      await BlogService.update(id, values);

      dispatch({
        type: blogFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.blog.update.success'));

      getHistory().push('/admin/blog');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default blogFormActions;
