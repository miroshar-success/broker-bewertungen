/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState, useEffect } from 'react';

// react-github-btn

// @mui material components
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import { Theme } from '@mui/material/styles';

// @mui icons

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

// Custom styles for the Configurator
import ConfiguratorRoot from 'src/mui/shared/Configurator/ConfiguratorRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';

function Configurator(): JSX.Element {
  const dispatch = useDispatch();
  const {
    openConfigurator,
    miniSidenav,
    fixedNavbar,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = selectMuiSettings();
  const [disabled, setDisabled] = useState<boolean>(false);
  const sidenavColors: (
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
  )[] = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ];

  // Use the useEffect hook to change the button state for the sidenav type based on window size.
  useEffect(() => {
    // A function that sets the disabled state of the buttons for the sidenav type.
    function handleDisabled() {
      return window.innerWidth > 1200
        ? setDisabled(false)
        : setDisabled(true);
    }

    // The event listener that's calling the handleDisabled function when resizing the window.
    window.addEventListener('resize', handleDisabled);

    // Call the handleDisabled function to set the state with the initial value.
    handleDisabled();

    // Remove event listener on cleanup
    return () =>
      window.removeEventListener('resize', handleDisabled);
  }, []);

  const handleCloseConfigurator = () => {
    dispatch(muiActions.doOpenConfigurator(false));
  };
  const handleTransparentSidenav = () => {
    dispatch(
      muiActions.doSave({
        transparentSidenav: true,
        whiteSidenav: false,
      }),
    );
    dispatch(muiActions.doTransparentSidenav(true));
    dispatch(muiActions.doWhiteSidenav(false));
  };
  const handleWhiteSidenav = () => {
    dispatch(
      muiActions.doSave({
        transparentSidenav: false,
        whiteSidenav: true,
      }),
    );
    dispatch(muiActions.doTransparentSidenav(false));
    dispatch(muiActions.doWhiteSidenav(true));
  };
  const handleDarkSidenav = () => {
    dispatch(
      muiActions.doSave({
        whiteSidenav: false,
        transparentSidenav: false,
      }),
    );
    dispatch(muiActions.doTransparentSidenav(false));
    dispatch(muiActions.doWhiteSidenav(false));
  };
  const handleMiniSidenav = () => {
    window.innerWidth >= 1200 &&
      dispatch(
        muiActions.doSave({
          miniSidenav: !miniSidenav,
        }),
      );
    dispatch(muiActions.doMiniSidenav(!miniSidenav));
  };
  const handleFixedNavbar = () => {
    dispatch(
      muiActions.doSave({
        fixedNavbar: !fixedNavbar,
      }),
    );
    dispatch(muiActions.doFixedNavbar(!fixedNavbar));
  };
  const handleDarkMode = () => {
    dispatch(
      muiActions.doSave({
        darkMode: !darkMode,
      }),
    );
    dispatch(muiActions.doDarkMode(!darkMode));
  };

  // sidenav type buttons styles
  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    palette: { white, dark, background },
    borders: { borderWidth },
  }: Theme | any) => ({
    height: pxToRem(39),
    background: darkMode ? background.sidenav : white.main,
    color: darkMode ? white.main : dark.main,
    border: `${borderWidth[1]} solid ${
      darkMode ? white.main : dark.main
    }`,

    '&:hover, &:focus, &:focus:not(:hover)': {
      background: darkMode
        ? background.sidenav
        : white.main,
      color: darkMode ? white.main : dark.main,
      border: `${borderWidth[1]} solid ${
        darkMode ? white.main : dark.main
      }`,
    },
  });

  // sidenav type active button styles
  const sidenavTypeActiveButtonStyles = ({
    functions: { pxToRem, linearGradient },
    palette: { white, gradients, background },
  }: Theme | any) => ({
    height: pxToRem(39),
    background: darkMode
      ? white.main
      : linearGradient(
          gradients.dark.main,
          gradients.dark.state,
        ),
    color: darkMode ? background.sidenav : white.main,

    '&:hover, &:focus, &:focus:not(:hover)': {
      background: darkMode
        ? white.main
        : linearGradient(
            gradients.dark.main,
            gradients.dark.state,
          ),
      color: darkMode ? background.sidenav : white.main,
    },
  });

  return (
    <ConfiguratorRoot
      variant="permanent"
      ownerState={{ openConfigurator }}
    >
      <MDBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={4}
        pb={0.5}
        px={3}
      >
        <MDBox>
          <MDTypography variant="h5">
            {i18n('mui.configurator.title')}
          </MDTypography>
          <MDTypography variant="body2" color="text">
            {i18n('mui.configurator.description')}
          </MDTypography>
        </MDBox>

        <Icon
          sx={({
            typography: { size },
            palette: { dark, white },
          }) => ({
            fontSize: `${size.lg} !important`,
            color: darkMode ? white.main : dark.main,
            stroke: 'currentColor',
            strokeWidth: '2px',
            cursor: 'pointer',
            transform: 'translateY(5px)',
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </MDBox>

      <Divider />

      <MDBox pt={0.5} pb={3} px={3}>
        <MDBox>
          <MDTypography variant="h6">
            {i18n('mui.configurator.sidenavColor')}
          </MDTypography>

          <MDBox mb={0.5}>
            {sidenavColors.map((color) => (
              <IconButton
                key={color}
                sx={({
                  borders: { borderWidth },
                  palette: { white, dark, background },
                  transitions,
                }: Theme | any) => ({
                  width: '24px',
                  height: '24px',
                  padding: 0,
                  border: `${borderWidth[1]} solid ${
                    darkMode
                      ? background.sidenav
                      : white.main
                  }`,
                  borderColor: () => {
                    let borderColorValue =
                      sidenavColor === color && dark.main;

                    if (
                      darkMode &&
                      sidenavColor === color
                    ) {
                      borderColorValue = white.main;
                    }

                    return borderColorValue;
                  },
                  transition: transitions.create(
                    'border-color',
                    {
                      easing: transitions.easing.sharp,
                      duration:
                        transitions.duration.shorter,
                    },
                  ),
                  backgroundImage: ({
                    functions: { linearGradient },
                    palette: { gradients },
                  }) =>
                    linearGradient(
                      gradients[color].main,
                      gradients[color].state,
                    ),

                  '&:not(:last-child)': {
                    mr: 1,
                  },

                  '&:hover, &:focus, &:active': {
                    borderColor: darkMode
                      ? white.main
                      : dark.main,
                  },
                })}
                onClick={() => {
                  dispatch(
                    muiActions.doSave({
                      sidenavColor: color,
                    }),
                  );
                  dispatch(
                    muiActions.doSidenavColor(color),
                  );
                }}
              />
            ))}
          </MDBox>
        </MDBox>

        <MDBox mt={3} lineHeight={1}>
          <MDTypography variant="h6">
            {i18n('mui.configurator.sidenavType.title')}
          </MDTypography>
          <MDTypography variant="button" color="text">
            {i18n(
              'mui.configurator.sidenavType.description',
            )}
          </MDTypography>

          <MDBox
            sx={{
              display: 'flex',
              mt: 2,
              mr: 1,
            }}
          >
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleDarkSidenav}
              disabled={disabled}
              fullWidth
              sx={
                !transparentSidenav && !whiteSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              {i18n('mui.configurator.sidenavType.dark')}
            </MDButton>
            <MDBox
              sx={{
                mx: 1,
                width: '8rem',
                minWidth: '8rem',
              }}
            >
              <MDButton
                color="dark"
                variant="gradient"
                onClick={handleTransparentSidenav}
                disabled={disabled}
                fullWidth
                sx={
                  transparentSidenav && !whiteSidenav
                    ? sidenavTypeActiveButtonStyles
                    : sidenavTypeButtonsStyles
                }
              >
                {i18n(
                  'mui.configurator.sidenavType.transparent',
                )}
              </MDButton>
            </MDBox>
            <MDButton
              color="dark"
              variant="gradient"
              onClick={handleWhiteSidenav}
              disabled={disabled}
              fullWidth
              sx={
                whiteSidenav && !transparentSidenav
                  ? sidenavTypeActiveButtonStyles
                  : sidenavTypeButtonsStyles
              }
            >
              {i18n('mui.configurator.sidenavType.white')}
            </MDButton>
          </MDBox>
        </MDBox>
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
          lineHeight={1}
        >
          <MDTypography variant="h6">
            {i18n('mui.configurator.navbarFixed')}
          </MDTypography>

          <Switch
            checked={fixedNavbar}
            onChange={handleFixedNavbar}
            color={sidenavColor}
          />
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}
        >
          <MDTypography variant="h6">
            {i18n('mui.configurator.sidenavMini')}
          </MDTypography>

          <Switch
            checked={miniSidenav}
            onChange={handleMiniSidenav}
            color={sidenavColor}
          />
        </MDBox>
        <Divider />
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          lineHeight={1}
        >
          <MDTypography variant="h6">
            {i18n('mui.configurator.sidenavDark')}
          </MDTypography>

          <Switch
            checked={darkMode}
            onChange={handleDarkMode}
            color={sidenavColor}
          />
        </MDBox>
        {/* <Divider />
          <MDBox mt={3} mb={2}>
            <MDBox mb={2}>
              <MDButton
                component={Link}
                href="https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts"
                target="_blank"
                rel="noreferrer"
                color="info"
                variant="gradient"
                fullWidth
              >
                buy now
              </MDButton>
            </MDBox>
            <MDBox mb={2}>
              <MDButton
                component={Link}
                href="https://www.creative-tim.com/product/material-dashboard-pro-react"
                target="_blank"
                rel="noreferrer"
                color="dark"
                variant="gradient"
                fullWidth
              >
                buy javascript version
              </MDButton>
            </MDBox>
            <MDButton
              component={Link}
              href="https://www.creative-tim.com/learning-lab/react/quick-start/material-dashboard/"
              target="_blank"
              rel="noreferrer"
              color={darkMode ? "light" : "dark"}
              variant="outlined"
              fullWidth
            >
              view documentation
            </MDButton>
          </MDBox>
          <MDBox display="flex" justifyContent="center">
            <GitHubButton
              href="https://github.com/creativetimofficial/ct-material-dashboard-pro-react"
              data-icon="octicon-star"
              data-size="large"
              data-show-count="true"
              aria-label="Star creativetimofficial/ct-material-dashboard-pro-react on GitHub"
            >
              Star
            </GitHubButton>
          </MDBox>
          <MDBox mt={2} textAlign="center">
            <MDBox mb={0.5}>
              <MDTypography variant="h6">Thank you for sharing!</MDTypography>
            </MDBox>

            <MDBox display="flex" justifyContent="center">
              <MDBox mr={1.5}>
                <MDButton
                  component={Link}
                  href="//twitter.com/intent/tweet?text=Check%20Material%20Dashboard%202%20PRO%20React%20made%20by%20%40CreativeTim%20%23webdesign%20%23dashboard%20%23react%20%mui&url=https%3A%2F%2Fwww.creative-tim.com%2Fproduct%2Fmaterial-dashboard-2-pro-react-ts"
                  target="_blank"
                  rel="noreferrer"
                  color="dark"
                >
                  <TwitterIcon />
                  &nbsp; Tweet
                </MDButton>
              </MDBox>
              <MDButton
                component={Link}
                href="https://www.facebook.com/sharer/sharer.php?u=https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts"
                target="_blank"
                rel="noreferrer"
                color="dark"
              >
                <FacebookIcon />
                &nbsp; Share
              </MDButton>
            </MDBox>
          </MDBox> */}
      </MDBox>
    </ConfiguratorRoot>
  );
}

export default Configurator;
