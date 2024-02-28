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

const { borderRadius } = borders;
const { xxl } = boxShadows;
const { background } = colors;

// types
type Types = any;

const dialog: Types = {
  styleOverrides: {
    paper: {
      backgroundColor: background.default,
      backgroundImage: 'none',
      borderRadius: borderRadius.lg,
      boxShadow: xxl,
      overflowY: 'visible',
    },

    paperFullScreen: {
      borderRadius: 0,
    },
  },
};

export default dialog;
