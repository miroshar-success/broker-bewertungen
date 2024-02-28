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

import { FC, forwardRef } from 'react';

// @mui material components
import { AvatarProps } from '@mui/material';

// Custom styles for MDAvatar
import MDAvatarRoot from 'src/mui/components/MDAvatar/MDAvatarRoot';

// declare props types for MDAvatar
interface Props extends AvatarProps {
  bgColor?:
    | 'transparent'
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'light'
    | 'dark';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  shadow?:
    | 'none'
    | 'xs'
    | 'sm'
    | 'md'
    | 'lg'
    | 'xl'
    | 'xxl'
    | 'inset';
  [key: string]: any;
}

const MDAvatar: FC<Props> = forwardRef(
  ({ bgColor, size, shadow, ...rest }, ref) => (
    <MDAvatarRoot
      ref={ref}
      ownerState={{ shadow, bgColor, size }}
      {...rest}
    />
  ),
);

// Declaring default props for MDAvatar
MDAvatar.defaultProps = {
  bgColor: 'transparent',
  size: 'md',
  shadow: 'none',
};

export default MDAvatar;
