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
import MenuItem from '@mui/material/MenuItem';
import Link from '@mui/material/Link';
import { MenuItemProps } from '@mui/material';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// custom styles for the NotificationItem
import menuItem from 'src/mui/shared/Items/NotificationItem/styles';

// Declaring props types for NotificationItem
interface Props extends MenuItemProps {
  outlink?: boolean;
  icon: ReactNode;
  title: string;
  [key: string]: any;
}

const NotificationItem: FC<Props> = forwardRef(
  ({ outlink, icon, title, ...rest }, ref) => {
    const attrs = outlink
      ? {
          href: rest.href,
          target: rest.target,
          rel: rest.rel,
        }
      : {};
    return (
      <MenuItem
        {...rest}
        ref={ref}
        sx={(theme) => menuItem(theme)}
      >
        <MDBox
          component={Link}
          {...attrs}
          py={0.5}
          display="flex"
          alignItems="center"
          lineHeight={1}
        >
          <MDTypography
            variant="body1"
            color="secondary"
            lineHeight={0.75}
          >
            {icon}
          </MDTypography>
          <MDTypography
            variant="button"
            fontWeight="regular"
            sx={{ ml: 1 }}
          >
            {title}
          </MDTypography>
        </MDBox>
      </MenuItem>
    );
  },
);

export default NotificationItem;
