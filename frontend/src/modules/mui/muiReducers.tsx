import actions from 'src/modules/mui/muiActions';
import AuthCurrentTenant from '../auth/authCurrentTenant';

const defaultSettings = AuthCurrentTenant.getMuiSettings();

interface StateTypes {
  loading: boolean;
  miniSidenav: boolean;
  transparentSidenav: boolean;
  whiteSidenav: boolean;
  sidenavColor:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error';
  transparentNavbar: boolean;
  fixedNavbar: boolean;
  openConfigurator: boolean;
  direction: 'ltr' | 'rtl';
  layout: 'dashboard' | 'page' | '';
  darkMode: boolean;
}

const initialState: StateTypes = {
  loading: false,
  miniSidenav: false,
  transparentSidenav: true,
  whiteSidenav: false,
  sidenavColor: 'info',
  transparentNavbar: true,
  fixedNavbar: true,
  openConfigurator: false,
  direction: 'ltr',
  layout: '',
  darkMode: false,
};

function filterState(state) {
  if (state === undefined) {
    return;
  }
  for (const key in state) {
    if (initialState[key] === undefined) {
      delete state[key];
    }
  }
}

export default (
  state = initialState,
  { type, value, payload },
) => {
  if (type === actions.INIT_RESET) {
    return {
      ...state,
      ...initialState,
    };
  }

  if (type === actions.INIT_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.INIT_SUCCESS) {
    filterState(payload);
    return {
      ...state,
      ...payload,
    };
  }

  if (type === actions.INIT_ERROR) {
    filterState(defaultSettings);
    return {
      ...state,
      ...defaultSettings,
    };
  }

  if (type === actions.SAVE_STARTED) {
    return {
      ...state,
    };
  }

  if (type === actions.SAVE_SUCCESS) {
    return {
      ...state,
    };
  }

  if (type === actions.SAVE_ERROR) {
    return {
      ...state,
    };
  }

  if (type === actions.MINI_SIDENAV) {
    return {
      ...state,
      miniSidenav: value,
    };
  }

  if (type === actions.TRANSPARENT_SIDENAV) {
    return {
      ...state,
      transparentSidenav: value,
    };
  }

  if (type === actions.WHITE_SIDENAV) {
    return {
      ...state,
      whiteSidenav: value,
    };
  }

  if (type === actions.SIDENAV_COLOR) {
    return {
      ...state,
      sidenavColor: value,
    };
  }

  if (type === actions.TRANSPARENT_NAVBAR) {
    return {
      ...state,
      transparentNavbar: value,
    };
  }

  if (type === actions.FIXED_NAVBAR) {
    return {
      ...state,
      fixedNavbar: value,
    };
  }

  if (type === actions.OPEN_CONFIGURATOR) {
    return {
      ...state,
      openConfigurator: value,
    };
  }

  if (type === actions.DIRECTION) {
    return {
      ...state,
      direction: value,
    };
  }

  if (type === actions.LAYOUT) {
    return {
      ...state,
      layout: value,
    };
  }

  if (type === actions.DARKMODE) {
    return {
      ...state,
      darkMode: value,
    };
  }

  return state;
};
