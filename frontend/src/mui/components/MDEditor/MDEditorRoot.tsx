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

// @mui material components
import { styled, Theme } from '@mui/material/styles';

export default styled('div')(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme | any;
    ownerState: any;
  }) => {
    const { palette, borders, typography } = theme;
    const { darkMode } = ownerState;

    const { borderRadius } = borders;
    const { size } = typography;
    const { text, white, dark } = palette;

    return {
      '& .ql-toolbar': {
        borderRadius: `${borderRadius.md} ${borderRadius.md} 0 0`,

        '& .ql-picker, & .ql-stroke': {
          stroke: `${
            darkMode ? white.main : dark.main
          } !important`,
          color: `${
            darkMode ? white.main : dark.main
          } !important`,
        },
      },

      '& .ql-container': {
        borderRadius: `0 0 ${borderRadius.md} ${borderRadius.md}`,
      },

      '& .ql-editor': {
        color: darkMode ? white.main : text.main,

        '& p': {
          fontSize: size.md,
          color: darkMode ? white.main : text.main,
        },

        '& ul li': {
          color: darkMode ? white.main : text.main,
        },
      },
    };
  },
);
