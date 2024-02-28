import { ConnectedRouter } from 'connected-react-router';
import {
  configureStore,
  getHistory,
} from 'src/modules/store';
import { useState, useEffect, useMemo } from 'react';
import { Provider, useDispatch } from 'react-redux';
import RoutesComponent from 'src/view/shared/routes/RoutesComponent';
import 'typeface-roboto';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Message from 'src/view/shared/message';
import {
  useLocation,
  useRouteMatch,
} from 'react-router-dom';

// @mui material components
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Material Dashboard 2 PRO React TS themes
import theme from 'src/mui/assets/theme';
import themeRTL from 'src/mui/assets/theme/theme-rtl';

// Material Dashboard 2 PRO React TS Dark Mode themes
import themeDark from 'src/mui/assets/theme-dark';
import themeDarkRTL from 'src/mui/assets/theme-dark/theme-rtl';

// RTL plugins
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import Menu from 'src/view/layout/Menu';
import Configurator from 'src/mui/shared/Configurator';
import { Icon } from '@mui/material';
import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';

import lightColors from 'src/mui/assets/theme/base/colors';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import navigationHomeActions from 'src/modules/navigation/home/navigationHomeActions';
import categoryFooterActions from 'src/modules/category/footer/categoryFooterActions';
import brokerTopActions from 'src/modules/broker/top/brokerTopActions';
import ScrollTop from 'src/ScrollTop';
import categorySidebarActions from 'src/modules/category/sidebar/categorySidebarActions';
import brokerFeaturedActions from 'src/modules/broker/featured/brokerFeaturedActions';
import navigationMostReadActions from 'src/modules/navigation/mostRead/navigationMostReadActions';
import navigationForexSchoolActions from 'src/modules/navigation/forexSchool/navigationForexSchoolActions';
import navigationForexStrategyActions from 'src/modules/navigation/forexStrategy/navigationForexStrategyActions';
import brokerComparableActions from 'src/modules/broker/comparable/brokerComparableActions';
import authorHomeActions from 'src/modules/author/home/authorHomeActions';
import CookieConsentTool from 'src/CookieConsentTool';
import promotionHomeActions from 'src/modules/promotion/home/promotionHomeActions';

import PiwikReactRouter from 'piwik-react-router';

const store = configureStore();

export default function App(props) {
  return (
    <Provider store={store}>
      <AppWithRedux {...props} />
    </Provider>
  );
}

function AppWithRedux(props) {
  const { direction, darkMode } = selectMuiSettings();

  const dispatch = useDispatch();

  const [rtlCache, setRtlCache] = useState(null);

  // Cache for the rtl
  useMemo(() => {
    const pluginRtl: any = rtlPlugin;
    const cacheRtl = createCache({
      key: 'rtl',
      stylisPlugins: [pluginRtl],
    });

    setRtlCache(cacheRtl);

    dispatch(navigationHomeActions.doFetch());
    dispatch(navigationMostReadActions.doFetch());
    dispatch(navigationForexSchoolActions.doFetch());
    dispatch(navigationForexStrategyActions.doFetch());
    dispatch(categoryFooterActions.doFetch());
    dispatch(categorySidebarActions.doFetch());
    dispatch(brokerComparableActions.doFetch());
    dispatch(brokerFeaturedActions.doFetch());
    dispatch(brokerTopActions.doFetch());
    dispatch(authorHomeActions.doFind());
    dispatch(promotionHomeActions.doFetch());
  }, []);

  return direction === 'rtl' ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider
        theme={darkMode ? themeDarkRTL : themeRTL}
      >
        <SnackbarProvider maxSnack={3}>
          <>
            <CssBaseline />
            <AppWithSnackbar {...props} />
          </>
        </SnackbarProvider>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <SnackbarProvider maxSnack={3}>
        <>
          <CssBaseline />
          <AppWithSnackbar {...props} />
        </>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

const piwik = PiwikReactRouter({
  url: 'https://broker-bewertungen.innocraft.cloud',
  siteId: '1',
  enableLinkTracking: true,
});

function AppWithSnackbar(props) {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    // this is a little hack to not have to import notistack
    // on all the components that emit messages
    Message.registerNotistakEnqueueSnackbar(
      enqueueSnackbar,
    );
  }, [enqueueSnackbar]);

  const {
    miniSidenav,
    openConfigurator,
    sidenavColor,
    direction,
    layout,
    darkMode,
  } = selectMuiSettings();

  const dispatch = useDispatch();

  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      dispatch(muiActions.doMiniSidenav(false));
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      dispatch(muiActions.doMiniSidenav(true));
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () =>
    dispatch(
      muiActions.doOpenConfigurator(!openConfigurator),
    );

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute('dir', direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.className = `${sidenavColor}-scrollbar`;
  }, [sidenavColor]);

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor={
        darkMode
          ? darkColors.dark.main
          : lightColors.white.main
      }
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="text"
      sx={{ cursor: 'pointer' }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );

  const match = useRouteMatch();

  return (
    <ConnectedRouter
      history={piwik.connectToHistory(
        getHistory(),
        (location) => location,
      )}
    >
      {layout === 'dashboard' && (
        <>
          <Menu
            url={match.url}
            brandName={i18n('app.title')}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === 'vr' && <Configurator />}
      <RoutesComponent />
      <ScrollTop />
      <CookieConsentTool darkMode={darkMode} />
    </ConnectedRouter>
  );
}
