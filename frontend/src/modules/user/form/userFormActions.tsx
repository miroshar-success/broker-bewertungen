import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import UserService from 'src/modules/user/userService';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import authActions from 'src/modules/auth/authActions';

const prefix = 'USER_FORM';

const userFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  ADD_STARTED: `${prefix}_ADD_STARTED`,
  ADD_SUCCESS: `${prefix}_ADD_SUCCESS`,
  ADD_ERROR: `${prefix}_ADD_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id?) => async (dispatch) => {
    try {
      dispatch({
        type: userFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);
      let record = {};

      if (isEdit) {
        record = await UserService.find(id);
      }

      dispatch({
        type: userFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/user');
    }
  },

  doAdd: (values) => async (dispatch) => {
    try {
      dispatch({
        type: userFormActions.ADD_STARTED,
      });

      await UserService.create(values);

      dispatch({
        type: userFormActions.ADD_SUCCESS,
      });

      Message.success(i18n('user.doAddSuccess'));

      getHistory().push('/admin/user');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.ADD_ERROR,
      });
    }
  },

  doUpdate: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userFormActions.UPDATE_STARTED,
      });

      await UserService.edit(values);

      dispatch({
        type: userFormActions.UPDATE_SUCCESS,
      });

      const currentUser = authSelectors.selectCurrentUser(
        getState(),
      );

      if (currentUser.id === values.id) {
        await dispatch(authActions.doRefreshCurrentUser());
      }

      Message.success(i18n('user.doUpdateSuccess'));

      getHistory().push('/admin/user');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default userFormActions;
