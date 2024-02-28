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

import { useState } from 'react';

// react-router components
import { Link } from 'react-router-dom';

// @mui material components
import Collapse from '@mui/material/Collapse';
import MuiLink from '@mui/material/Link';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS exampless
import DefaultNavbarDropdown from 'src/mui/shared/Navbars/DefaultNavbar/DefaultNavbarDropdown';
import { Card } from '@mui/material';

// Declaring props types for DefaultNavbarMobile
interface Props {
  routes: any;
  open: any;
}

function DefaultNavbarMobile({
  routes,
  open,
}: Props): JSX.Element {
  const [collapse, setCollapse] = useState<
    string | boolean
  >('');

  const handleSetCollapse = (name: string) =>
    collapse === name
      ? setCollapse(false)
      : setCollapse(name);

  const renderNavbarItems = routes.map(
    ({
      name,
      icon,
      children: routeCollapses,
      href,
      route,
      children: navCollapse,
    }: any) => (
      <DefaultNavbarDropdown
        key={name}
        name={name}
        icon={icon}
        collapseStatus={name === collapse}
        onClick={() => handleSetCollapse(name)}
        href={href}
        route={route}
        collapse={Boolean(
          navCollapse && navCollapse.length,
        )}
      >
        <MDBox
          sx={{
            height: '15rem',
            maxHeight: '15rem',
            overflowY: 'scroll',
            mx: 2,
          }}
        >
          {routeCollapses &&
            routeCollapses.map((item: any) => (
              <MDBox key={item.name}>
                {item.collapse ? (
                  <>
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="bold"
                      textTransform="capitalize"
                      py={1}
                      px={0.5}
                    >
                      {item.name}
                    </MDTypography>
                    {item.collapse.map((el: any) => (
                      <MDTypography
                        key={el.name}
                        component={
                          el.route ? Link : MuiLink
                        }
                        to={el.route ? el.route : ''}
                        href={el.href ? el.href : ''}
                        target={el.href ? '_blank' : ''}
                        rel={
                          el.href
                            ? 'noreferrer'
                            : 'noreferrer'
                        }
                        minWidth="11.25rem"
                        display="block"
                        variant="button"
                        color="text"
                        textTransform="capitalize"
                        fontWeight="regular"
                        py={0.625}
                        px={2}
                        sx={({
                          palette: { grey, dark },
                          borders: { borderRadius },
                        }: Theme) => ({
                          borderRadius: borderRadius.md,
                          cursor: 'pointer',
                          transition: 'all 300ms linear',

                          '&:hover': {
                            backgroundColor: grey[200],
                            color: dark.main,
                          },
                        })}
                      >
                        {el.name}
                      </MDTypography>
                    ))}
                  </>
                ) : (
                  <MDBox
                    key={item.key}
                    display="block"
                    component={item.route ? Link : MuiLink}
                    to={item.route ? item.route : ''}
                    href={item.href ? item.href : ''}
                    target={item.href ? '_blank' : ''}
                    rel={
                      item.href
                        ? 'noreferrer'
                        : 'noreferrer'
                    }
                    sx={({
                      palette: { grey, dark },
                      borders: { borderRadius },
                    }) => ({
                      borderRadius: borderRadius.md,
                      cursor: 'pointer',
                      transition: 'all 300ms linear',
                      py: 1,
                      px: 3,

                      '&:hover': {
                        backgroundColor: grey[200],
                        color: dark.main,

                        '& *': {
                          color: dark.main,
                        },
                      },
                    })}
                  >
                    <MDTypography
                      display="block"
                      variant="button"
                      fontWeight="regular"
                      textTransform="capitalize"
                    >
                      {item.name}
                    </MDTypography>
                    <MDTypography
                      display="block"
                      variant="button"
                      color="text"
                      fontWeight="regular"
                      sx={{
                        transition: 'all 300ms linear',
                      }}
                    >
                      {item.description}
                    </MDTypography>
                  </MDBox>
                )}
              </MDBox>
            ))}
        </MDBox>
      </DefaultNavbarDropdown>
    ),
  );

  return (
    <Collapse
      in={Boolean(open)}
      timeout="auto"
      unmountOnExit
    >
      <Card sx={{ mb: 2 }}>
        <MDBox m={2}>{renderNavbarItems}</MDBox>
      </Card>
    </Collapse>
  );
}

export default DefaultNavbarMobile;
