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
import {
  OutlinedTextFieldProps,
  StandardTextFieldProps,
} from '@mui/material';

// Custom styles for MDInput
import MDInputRoot from 'src/mui/components/MDInput/MDInputRoot';

// Declaring props types for MDInput
interface Props
  extends Omit<
    OutlinedTextFieldProps | StandardTextFieldProps,
    'variant'
  > {
  variant?: 'standard' | 'outlined';
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
}

const MDInput: FC<Props | any> = forwardRef(
  ({ error, success, disabled, ...rest }, ref) => (
    <MDInputRoot
      {...rest}
      ref={ref}
      ownerState={{ error, success, disabled }}
    />
  ),
);

// Declaring default props for MDInput
MDInput.defaultProps = {
  error: false,
  success: false,
  disabled: false,
};

export default MDInput;
