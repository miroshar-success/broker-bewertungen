import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import MuiService from 'src/modules/mui/muiService';
import authSelectors from 'src/modules/auth/authSelectors';
import AuthCurrentTenant from 'src/modules/auth/authCurrentTenant';

const prefix = 'MUI_ACTIONS';

const muiActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  INIT_RESET: `${prefix}_INIT_RESET`,

  SAVE_STARTED: `${prefix}_SAVE_STARTED`,
  SAVE_SUCCESS: `${prefix}_SAVE_SUCCESS`,
  SAVE_ERROR: `${prefix}_SAVE_ERROR`,

  MINI_SIDENAV: `${prefix}_MINI_SIDENAV`,
  TRANSPARENT_SIDENAV: `${prefix}_TRANSPARENT_SIDENAV`,
  WHITE_SIDENAV: `${prefix}_WHITE_SIDENAV`,
  SIDENAV_COLOR: `${prefix}_SIDENAV_COLOR`,
  TRANSPARENT_NAVBAR: `${prefix}_TRANSPARENT_NAVBAR`,
  FIXED_NAVBAR: `${prefix}_FIXED_NAVBAR`,
  OPEN_CONFIGURATOR: `${prefix}_OPEN_CONFIGURATOR`,
  DIRECTION: `${prefix}_DIRECTION`,
  LAYOUT: `${prefix}_LAYOUT`,
  DARKMODE: `${prefix}_DARKMODE`,

  doMiniSidenav: (value) => {
    return {
      type: muiActions.MINI_SIDENAV,
      value: value,
    };
  },

  doTransparentSidenav: (value) => {
    return {
      type: muiActions.TRANSPARENT_SIDENAV,
      value: value,
    };
  },

  doWhiteSidenav: (value) => {
    return {
      type: muiActions.WHITE_SIDENAV,
      value: value,
    };
  },

  doSidenavColor: (value) => {
    return {
      type: muiActions.SIDENAV_COLOR,
      value: value,
    };
  },

  doTransparentNavbar: (value) => {
    return {
      type: muiActions.TRANSPARENT_NAVBAR,
      value: value,
    };
  },

  doFixedNavbar: (value) => {
    return {
      type: muiActions.FIXED_NAVBAR,
      value: value,
    };
  },

  doOpenConfigurator: (value) => {
    return {
      type: muiActions.OPEN_CONFIGURATOR,
      value: value,
    };
  },

  doDirection: (value) => {
    return {
      type: muiActions.DIRECTION,
      value: value,
    };
  },

  doLayout: (value) => {
    return {
      type: muiActions.LAYOUT,
      value: value,
    };
  },

  doDarkMode: (value) => {
    return {
      type: muiActions.DARKMODE,
      value: value,
    };
  },

  doInit: () => async (dispatch, getState) => {
    try {
      if (
        !authSelectors.selectSignedIn(getState()) ||
        !AuthCurrentTenant.get()
      ) {
        return;
      }

      const settings = await MuiService.find();

      dispatch({
        type: muiActions.INIT_SUCCESS,
        payload: settings,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: muiActions.INIT_ERROR,
      });

      getHistory().push('/admin');
    }
  },

  doSave: (values) => async (dispatch, getState) => {
    try {
      await MuiService.save(values);
    } catch (error) {
      Errors.handle(error);
    }
  },
};

export default muiActions;
