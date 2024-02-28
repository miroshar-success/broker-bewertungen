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

import { FC, ReactNode, forwardRef } from 'react';

// @mui material components
import { ButtonProps } from '@mui/material';

// Custom styles for MDSocialButton
import MDSocialButtonRoot from 'src/mui/components/MDSocialButton/MDSocialButtonRoot';

// Declaring props types for MDButton
interface Props
  extends Omit<ButtonProps, 'color' | 'variant'> {
  color?:
    | 'facebook'
    | 'twitter'
    | 'instagram'
    | 'linkedin'
    | 'pinterest'
    | 'youtube'
    | 'github'
    | 'vimeo'
    | 'slack'
    | 'dribbble'
    | 'reddit'
    | 'tumblr';
  size?: 'small' | 'medium' | 'large';
  circular?: boolean;
  iconOnly?: boolean;
  children?: ReactNode;
  [key: string]: any;
}

const MDSocialButton: FC<Props> = forwardRef(
  (
    { color, size, iconOnly, circular, children, ...rest },
    ref,
  ) => (
    <MDSocialButtonRoot
      {...rest}
      ref={ref}
      variant="contained"
      color="primary"
      size={size}
      ownerState={{ color, size, iconOnly, circular }}
    >
      {children}
    </MDSocialButtonRoot>
  ),
);

// Setting default values for the props of MDSocialButton
MDSocialButton.defaultProps = {
  size: 'medium',
  color: 'facebook',
  iconOnly: false,
  circular: false,
};

export default MDSocialButton;
