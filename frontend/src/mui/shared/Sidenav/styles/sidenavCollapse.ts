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
import { Theme } from '@mui/material/styles';

function collapseItem(theme: Theme, ownerState: any) {
  const {
    palette,
    transitions,
    breakpoints,
    boxShadows,
    borders,
    functions,
  } = theme;
  const {
    active,
    transparentSidenav,
    whiteSidenav,
    darkMode,
    color,
    noCollapse,
  } = ownerState;

  const { white, transparent, dark, grey } = palette;
  const { md } = boxShadows;
  const { borderRadius } = borders;
  const { pxToRem, rgba } = functions;

  return {
    background: () => {
      let backgroundValue;

      if (noCollapse && active) {
        backgroundValue = palette[color].main;
      } else if (transparentSidenav && darkMode) {
        backgroundValue = active
          ? rgba(white.main, 0.2)
          : transparent.main;
      } else if (transparentSidenav && !darkMode) {
        backgroundValue = active
          ? grey[300]
          : transparent.main;
      } else if (whiteSidenav) {
        backgroundValue = active
          ? grey[200]
          : transparent.main;
      } else {
        backgroundValue = active
          ? rgba(white.main, 0.2)
          : transparent.main;
      }

      return backgroundValue;
    },
    color:
      active && noCollapse
        ? white.main
        : (transparentSidenav && !darkMode) || whiteSidenav
        ? dark.main
        : white.main,
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${pxToRem(8)} ${pxToRem(16)}`,
    margin: `${pxToRem(1.5)} ${pxToRem(16)}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    boxShadow:
      active &&
      !whiteSidenav &&
      !darkMode &&
      !transparentSidenav
        ? md
        : 'none',
    [breakpoints.up('xl')]: {
      transition: transitions.create(
        ['box-shadow', 'background-color'],
        {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.shorter,
        },
      ),
    },

    '&:hover, &:focus': {
      backgroundColor:
        active && noCollapse
          ? palette[color].main
          : transparentSidenav && !darkMode
          ? grey[300]
          : rgba(
              whiteSidenav ? grey[400] : white.main,
              0.2,
            ),
    },
  };
}

function collapseIconBox(theme: Theme, ownerState: any) {
  const { palette, transitions, borders, functions } =
    theme;
  const {
    transparentSidenav,
    whiteSidenav,
    darkMode,
    active,
    noCollapse,
  } = ownerState;

  const { white, dark } = palette;
  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    color:
      active && noCollapse
        ? white.main
        : (transparentSidenav && !darkMode) || whiteSidenav
        ? dark.main
        : white.main,
    borderRadius: borderRadius.md,
    display: 'grid',
    placeItems: 'center',
    transition: transitions.create('margin', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard,
    }),

    '& svg, svg g, span.MuiIcon-root': {
      color:
        active && noCollapse
          ? white.main
          : (transparentSidenav && !darkMode) ||
            whiteSidenav
          ? dark.main
          : white.main,
    },
  };
}

const collapseIcon = (
  { palette: { white, gradients } }: Theme,
  { active, noCollapse }: any,
) => ({
  color:
    active && noCollapse
      ? white.main
      : active
      ? white.main
      : gradients.dark.state,
});

function collapseText(theme: any, ownerState: any) {
  const {
    typography,
    transitions,
    breakpoints,
    functions,
  } = theme;
  const {
    miniSidenav,
    transparentSidenav,
    active,
    noCollapse,
  } = ownerState;

  const { size, fontWeightRegular, fontWeightLight } =
    typography;
  const { pxToRem } = functions;

  return {
    marginLeft: pxToRem(10),

    [breakpoints.up('xl')]: {
      opacity:
        miniSidenav || (miniSidenav && transparentSidenav)
          ? 0
          : 1,
      maxWidth:
        miniSidenav || (miniSidenav && transparentSidenav)
          ? 0
          : '100%',
      marginLeft:
        miniSidenav || (miniSidenav && transparentSidenav)
          ? 0
          : pxToRem(10),
      transition: transitions.create(
        ['opacity', 'margin'],
        {
          easing: transitions.easing.easeInOut,
          duration: transitions.duration.standard,
        },
      ),
    },

    '& span': {
      fontWeight: active
        ? fontWeightRegular
        : fontWeightLight,
      fontSize: size.sm,
      lineHeight: '2rem',
      overflow: 'hidden',
      width: noCollapse ? '135px' : '110px',
      display: 'block',
      textOverflow: 'ellipsis',
      textTransform: 'capitalize',
    },
  };
}

function collapseArrow(theme: Theme, ownerState: any) {
  const {
    palette,
    typography,
    transitions,
    breakpoints,
    functions,
  } = theme;
  const {
    noCollapse,
    transparentSidenav,
    whiteSidenav,
    miniSidenav,
    open,
    active,
    darkMode,
  } = ownerState;

  const { white, dark } = palette;
  const { size } = typography;
  const { pxToRem, rgba } = functions;

  return {
    fontSize: `${size.lg} !important`,
    fontWeight: 700,
    marginBottom: pxToRem(-1),
    transform: open ? 'rotate(0)' : 'rotate(-180deg)',
    color: () => {
      let colorValue;

      if (transparentSidenav && darkMode) {
        colorValue =
          open || active
            ? white.main
            : rgba(white.main, 0.25);
      } else if (transparentSidenav || whiteSidenav) {
        colorValue =
          open || active
            ? dark.main
            : rgba(dark.main, 0.25);
      } else {
        colorValue =
          open || active
            ? white.main
            : rgba(white.main, 0.5);
      }

      return colorValue;
    },
    transition: transitions.create(
      ['color', 'transform', 'opacity'],
      {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter,
      },
    ),

    // [breakpoints.up('xl')]: {
    display:
      noCollapse ||
      (transparentSidenav && miniSidenav) ||
      miniSidenav
        ? 'none !important'
        : 'block !important',
    // },
  };
}

export {
  collapseItem,
  collapseIconBox,
  collapseIcon,
  collapseText,
  collapseArrow,
};
