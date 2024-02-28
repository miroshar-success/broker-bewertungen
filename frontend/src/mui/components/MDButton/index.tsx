/**
=========================================================
* Material Dashboard 2 PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-pro-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { FC, ReactNode, forwardRef } from 'react';

// @mui material components
import { ButtonProps } from '@mui/material';

// Custom styles for MDButton
import MDButtonRoot from 'src/mui/components/MDButton/MDButtonRoot';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import muiSelectors, {
  selectMuiSettings,
} from 'src/modules/mui/muiSelectors';

// Declaring props types for MDButton
interface Props
  extends Omit<ButtonProps, 'color' | 'variant'> {
  color?:
    | 'white'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark'
    | 'default';
  variant?: 'text' | 'contained' | 'outlined' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const MDButton: FC<Props> = forwardRef(
  (
    {
      color,
      variant,
      size,
      circular,
      iconOnly,
      children,
      ...rest
    },
    ref,
  ) => {
    const { darkMode } = selectMuiSettings();

    return (
      <MDButtonRoot
        {...rest}
        ref={ref}
        ownerState={{
          color,
          variant,
          size,
          circular,
          iconOnly,
          darkMode,
        }}
      >
        {children}
      </MDButtonRoot>
    );
  },
);

// Declaring default props for MDButton
MDButton.defaultProps = {
  color: 'white',
  variant: 'contained',
  size: 'medium',
  circular: false,
  iconOnly: false,
};

export default MDButton;
