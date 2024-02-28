import BlogCommentService from 'src/modules/blogComment/blogCommentService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'BLOGCOMMENT_FORM';

const blogCommentFormActions = {
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
        type: blogCommentFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BlogCommentService.find(id);
      }

      dispatch({
        type: blogCommentFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogCommentFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/blog-comment');
    }
  },

  doCreate:
    (values, fnSuccess = null) =>
    async (dispatch) => {
      try {
        dispatch({
          type: blogCommentFormActions.CREATE_STARTED,
        });

        await BlogCommentService.create(values);

        dispatch({
          type: blogCommentFormActions.CREATE_SUCCESS,
        });

        Message.success(
          i18n('entities.blogComment.create.success'),
        );

        fnSuccess && fnSuccess();

        // getHistory().push('/');
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: blogCommentFormActions.CREATE_ERROR,
        });
      }
    },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: blogCommentFormActions.UPDATE_STARTED,
      });

      await BlogCommentService.update(id, values);

      dispatch({
        type: blogCommentFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.blogComment.update.success'),
      );

      getHistory().push('/admin/blog-comment');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: blogCommentFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default blogCommentFormActions;
