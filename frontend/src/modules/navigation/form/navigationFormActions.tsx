import NavigationService from 'src/modules/navigation/navigationService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'NAVIGATION_FORM';

const navigationFormActions = {
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
        type: navigationFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NavigationService.find(id);
      }

      dispatch({
        type: navigationFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: navigationFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/navigation');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: navigationFormActions.CREATE_STARTED,
      });

      await NavigationService.create(values);

      dispatch({
        type: navigationFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.navigation.create.success'),
      );

      getHistory().push('/admin/navigation');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: navigationFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: navigationFormActions.UPDATE_STARTED,
      });

      await NavigationService.update(id, values);

      dispatch({
        type: navigationFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.navigation.update.success'),
      );

      getHistory().push('/admin/navigation');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: navigationFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default navigationFormActions;
