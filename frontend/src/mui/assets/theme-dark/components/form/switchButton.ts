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

// Material Dashboard 2 PRO React TS Base Styles
import colors from 'src/mui/assets/theme-dark/base/colors';
import borders from 'src/mui/assets/theme-dark/base/borders';
import boxShadows from 'src/mui/assets/theme-dark/base/boxShadows';

// Material Dashboard 2 PRO React TS Helper Functions
// import rgba from "src/mui/assets/theme-dark/functions/rgba";
import pxToRem from 'src/mui/assets/theme-dark/functions/pxToRem';

const { white, gradients, grey, transparent } = colors;
const { borderWidth } = borders;
const { md } = boxShadows;

// types
type Types = any;

const switchButton: Types = {
  defaultProps: {
    disableRipple: false,
  },

  styleOverrides: {
    switchBase: {
      '&:hover': {
        backgroundColor: transparent.main,
      },

      '&.Mui-checked': {
        '&:hover': {
          backgroundColor: transparent.main,
        },

        '& .MuiSwitch-thumb': {
          borderColor: `${gradients.dark.main} !important`,
        },

        '& + .MuiSwitch-track': {
          opacity: 1,
        },
      },

      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: '0.3 !important',
      },
    },

    thumb: {
      backgroundColor: white.main,
      boxShadow: md,
      border: `${borderWidth[1]} solid ${grey[400]}`,
    },

    track: {
      width: pxToRem(32),
      height: pxToRem(15),
      backgroundColor: grey[400],
      opacity: 1,
    },

    checked: {},
  },
};

export default switchButton;
