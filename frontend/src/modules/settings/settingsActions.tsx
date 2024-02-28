import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import SettingsService from 'src/modules/settings/settingsService';
import Message from 'src/view/shared/message';
import { i18n } from 'src/i18n';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const prefix = 'SETTINGS';

const settingsActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  doInit: () => async (dispatch, getState) => {
    try {
      if (
        !authSelectors.selectSignedIn(getState()) ||
        !AuthCurrentTenant.get()
      ) {
        return;
      }

      dispatch({
        type: settingsActions.INIT_STARTED,
      });

      const settings = await SettingsService.find();

      dispatch({
        type: settingsActions.INIT_SUCCESS,
        payload: settings,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: settingsActions.INIT_ERROR,
      });

      getHistory().push('/admin');
    }
  },

  doSave: (values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: settingsActions.SAVE_STARTED,
      });

      await SettingsService.save(values);

      dispatch({
        type: settingsActions.SAVE_SUCCESS,
      });

      const secondsForReload = 3;

      Message.success(
        i18n('settings.save.success', secondsForReload),
      );

      /**
       * Theme change happens at boot time.
       * So to take effect the page must be reloaded
       */
      setTimeout(
        () => window.location.reload(),
        secondsForReload * 1000,
      );
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: settingsActions.SAVE_ERROR,
      });
    }
  },
};

export default settingsActions;
