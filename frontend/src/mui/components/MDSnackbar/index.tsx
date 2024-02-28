/* eslint-disable react/default-props-match-prop-types */
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

import { ReactNode } from 'react';

// @mui material components
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Icon from '@mui/material/Icon';
import Divider from '@mui/material/Divider';
import Fade from '@mui/material/Fade';
import { SnackbarProps } from '@mui/material';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Custom styles for the MDSnackbar
import MDSnackbarIconRoot from 'src/mui/components/MDSnackbar/MDSnackbarIconRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Declaring props types for MDSnackbar
interface Props extends SnackbarProps {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark'
    | 'light';
  icon: ReactNode;
  title: string;
  dateTime: string;
  content: string;
  close: () => void;
  bgWhite?: boolean;
  [key: string]: any;
}

function MDSnackbar({
  color,
  icon,
  title,
  dateTime,
  content,
  close,
  bgWhite,
  ...rest
}: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  let titleColor: any;
  let dateTimeColor: any;
  let dividerColor: any;

  if (bgWhite) {
    titleColor = color;
    dateTimeColor = 'dark';
    dividerColor = false;
  } else if (color === 'light') {
    titleColor = darkMode ? 'inherit' : 'dark';
    dateTimeColor = darkMode ? 'inherit' : 'text';
    dividerColor = false;
  } else {
    titleColor = 'white';
    dateTimeColor = 'white';
    dividerColor = true;
  }

  return (
    <Snackbar
      TransitionComponent={Fade}
      autoHideDuration={5000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      {...rest}
      action={
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={close}
        >
          <Icon fontSize="small">close</Icon>
        </IconButton>
      }
    >
      <MDBox
        variant={bgWhite ? 'contained' : 'gradient'}
        bgColor={bgWhite ? 'white' : color}
        minWidth="21.875rem"
        maxWidth="100%"
        shadow="md"
        borderRadius="md"
        p={1}
        sx={{
          backgroundColor: ({
            palette,
          }: {
            palette: any;
          }) =>
            darkMode
              ? palette.background.card
              : palette[color] || palette.white.main,
        }}
      >
        <MDBox
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          color="dark"
          p={1.5}
        >
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={0}
          >
            <MDSnackbarIconRoot
              fontSize="small"
              ownerState={{ color, bgWhite }}
            >
              {icon}
            </MDSnackbarIconRoot>
            <MDTypography
              variant="button"
              fontWeight="medium"
              color={titleColor}
              textGradient={bgWhite}
            >
              {title}
            </MDTypography>
          </MDBox>
          <MDBox
            display="flex"
            alignItems="center"
            lineHeight={0}
          >
            <MDTypography
              variant="caption"
              color={dateTimeColor}
            >
              {dateTime}
            </MDTypography>
            <Icon
              sx={{
                color: ({ palette: { dark, white } }) =>
                  (bgWhite && !darkMode) ||
                  color === 'light'
                    ? dark.main
                    : white.main,
                fontWeight: ({
                  typography: { fontWeightBold },
                }) => fontWeightBold,
                cursor: 'pointer',
                marginLeft: 2,
                transform: 'translateY(-1px)',
              }}
              onClick={close}
            >
              close
            </Icon>
          </MDBox>
        </MDBox>
        <Divider sx={{ margin: 0 }} light={dividerColor} />
        <MDBox
          p={1.5}
          sx={{
            fontSize: ({ typography: { size } }) => size.sm,
            color: ({ palette }: { palette: any }) => {
              let colorValue =
                bgWhite || color === 'light'
                  ? palette.text.main
                  : palette.white.main;

              if (darkMode) {
                colorValue =
                  color === 'light'
                    ? 'inherit'
                    : palette.white.main;
              }

              return colorValue;
            },
          }}
        >
          {content}
        </MDBox>
      </MDBox>
    </Snackbar>
  );
}

// Setting default values for the props of MDSnackbar
MDSnackbar.defaultProps = {
  bgWhite: false,
  color: 'info',
};

export default MDSnackbar;
