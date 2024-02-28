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

// Material Dashboard 2 PRO React Helper Function
import rgba from 'src/mui/assets/theme-dark/functions/rgba';

const { black, background } = colors;
const { borderWidth, borderRadius } = borders;
const { md } = boxShadows;

// types
type Types = any;

const card: Types = {
  styleOverrides: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      minWidth: 0,
      wordWrap: 'break-word',
      backgroundImage: 'none',
      backgroundColor: background.card,
      backgroundClip: 'border-box',
      border: `${borderWidth[0]} solid ${rgba(
        black.main,
        0.125,
      )}`,
      borderRadius: borderRadius.xl,
      boxShadow: md,
      overflow: 'visible',
    },
  },
};

export default card;
