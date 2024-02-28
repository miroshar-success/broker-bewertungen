import AuthorService from 'src/modules/author/authorService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'AUTHOR_FORM';

const authorFormActions = {
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
        type: authorFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await AuthorService.find(id);
      }

      dispatch({
        type: authorFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: authorFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/author');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: authorFormActions.CREATE_STARTED,
      });

      await AuthorService.create(values);

      dispatch({
        type: authorFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.author.create.success'),
      );

      getHistory().push('/admin/author');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: authorFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: authorFormActions.UPDATE_STARTED,
      });

      await AuthorService.update(id, values);

      dispatch({
        type: authorFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.author.update.success'),
      );

      getHistory().push('/admin/author');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: authorFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default authorFormActions;
