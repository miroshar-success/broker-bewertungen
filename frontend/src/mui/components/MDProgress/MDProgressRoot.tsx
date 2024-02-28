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
import LinearProgress from '@mui/material/LinearProgress';

export default styled(LinearProgress)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme | any;
    ownerState: any;
  }) => {
    const { palette, functions } = theme;
    const { color, value, variant } = ownerState;

    const { text, gradients } = palette;
    const { linearGradient } = functions;

    // background value
    let backgroundValue;

    if (variant === 'gradient') {
      backgroundValue = gradients[color]
        ? linearGradient(
            gradients[color].main,
            gradients[color].state,
          )
        : linearGradient(
            gradients.info.main,
            gradients.info.state,
          );
    } else {
      backgroundValue = palette[color]
        ? palette[color].main
        : palette.info.main;
    }

    return {
      '& .MuiLinearProgress-bar': {
        background: backgroundValue,
        width: `${value}%`,
        color: text.main,
      },
    };
  },
);
