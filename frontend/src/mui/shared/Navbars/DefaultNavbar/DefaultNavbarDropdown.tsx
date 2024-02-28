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

import { ReactNode } from 'react';

// react-router-dom components
import { Link } from 'react-router-dom';

// @mui material components
import Collapse from '@mui/material/Collapse';
import Icon from '@mui/material/Icon';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Declaring props types for DefaultNavbarDropdown
interface Props {
  name: string;
  icon?: ReactNode;
  children?: ReactNode;
  collapseStatus?: boolean;
  light?: boolean;
  href?: string;
  route?: string;
  collapse: boolean;
  [key: string]: any;
}

function DefaultNavbarDropdown({
  name,
  icon,
  children,
  collapseStatus,
  light,
  href,
  route,
  collapse,
  ...rest
}: Props): JSX.Element {
  const linkComponent = {
    component: 'a',
    href,
    target: '_blank',
    rel: 'noreferrer',
  };

  const routeComponent: any = {
    component: Link,
    to: route,
  };

  return (
    <>
      <MDBox
        {...rest}
        // mx={1}
        px={{ sm: 1, md: 0 }}
        py={1}
        display="flex"
        alignItems="baseline"
        color={light ? 'white' : 'dark'}
        // opacity={light ? 1 : 0.6}
        sx={{ cursor: 'pointer', userSelect: 'none' }}
        {...(!collapse && route && routeComponent)}
        {...(!collapse && href && linkComponent)}
      >
        {icon && (
          <MDTypography
            variant="body2"
            lineHeight={1}
            color="inherit"
            sx={{
              alignSelf: 'center',
              '& *': { verticalAlign: 'middle' },
            }}
          >
            {icon}
          </MDTypography>
        )}
        <MDTypography
          variant="button"
          fontWeight="bold"
          textTransform="capitalize"
          color={light ? 'white' : 'dark'}
          sx={{ fontWeight: '100%' }}
        >
          {name}
        </MDTypography>
        {collapse && (
          <MDTypography
            variant="body2"
            color={light ? 'white' : 'dark'}
            lineHeight={0}
            ml="auto"
          >
            <Icon
              sx={{
                fontWeight: 'normal',
                verticalAlign: 'middle',
              }}
            >
              keyboard_arrow_down
            </Icon>
          </MDTypography>
        )}
      </MDBox>
      {children && (
        <Collapse
          in={Boolean(collapseStatus)}
          timeout={400}
          unmountOnExit
        >
          {children}
        </Collapse>
      )}
    </>
  );
}

// Declaring default props for DefaultNavbarDropdown
DefaultNavbarDropdown.defaultProps = {
  icon: false,
  children: false,
  collapseStatus: false,
  light: false,
  href: '',
  route: '',
};

export default DefaultNavbarDropdown;
