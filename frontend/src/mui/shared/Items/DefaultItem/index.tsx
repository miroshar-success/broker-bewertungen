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

import { forwardRef, FC, ReactNode } from 'react';

// @mui material components
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// custom styles for the DefaultItem
import defaultItemIconBox from 'src/mui/shared/Items/DefaultItem/styles';

// Declaring props types for DefaultItem
interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'info'
    | 'success'
    | 'warning'
    | 'error'
    | 'dark';
  icon: ReactNode;
  title: string;
  description: string;
  [key: string]: any;
}

const DefaultItem: FC<Props> = forwardRef(
  ({ color, icon, title, description, ...rest }, ref) => (
    <MDBox
      {...rest}
      ref={ref}
      display="flex"
      alignItems="center"
    >
      <MDBox
        sx={(theme) => defaultItemIconBox(theme, { color })}
      >
        <Icon>{icon}</Icon>
      </MDBox>
      <MDBox ml={2} mt={0.5} lineHeight={1.4}>
        <MDTypography
          display="block"
          variant="button"
          fontWeight="medium"
        >
          {title}
        </MDTypography>
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
        >
          {description}
        </MDTypography>
      </MDBox>
    </MDBox>
  ),
);

// Declaring default props for DefaultItem
DefaultItem.defaultProps = {
  color: 'info',
};

export default DefaultItem;
