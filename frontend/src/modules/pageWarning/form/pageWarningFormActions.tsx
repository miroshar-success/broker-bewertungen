import PageWarningService from 'src/modules/pageWarning/pageWarningService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PAGE_WARNING_FORM';

const pageWarningFormActions = {
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
        type: pageWarningFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PageWarningService.find(id);
      }

      dispatch({
        type: pageWarningFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: pageWarningFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/page-warning');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: pageWarningFormActions.CREATE_STARTED,
      });

      await PageWarningService.create(values);

      dispatch({
        type: pageWarningFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.pageWarning.create.success'),
      );

      getHistory().push('/admin/page-warning');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: pageWarningFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: pageWarningFormActions.UPDATE_STARTED,
      });

      await PageWarningService.update(id, values);

      dispatch({
        type: pageWarningFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.pageWarning.update.success'),
      );

      getHistory().push('/admin/page-warning');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: pageWarningFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default pageWarningFormActions;
