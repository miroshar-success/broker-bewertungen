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

import { useEffect, ReactNode } from 'react';
import { useDispatch } from 'react-redux';

// react-router-dom components
import { useLocation } from 'react-router-dom';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function DashboardLayout({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const dispatch = useDispatch();
  const { miniSidenav } = selectMuiSettings();
  const { pathname } = useLocation();

  useEffect(() => {
    dispatch(muiActions.doLayout('dashboard'));
  }, [pathname]);

  return (
    <MDBox
      sx={({
        breakpoints,
        transitions,
        functions: { pxToRem },
      }) => ({
        p: 3,
        position: 'relative',

        [breakpoints.up('xl')]: {
          marginLeft: miniSidenav
            ? pxToRem(120)
            : pxToRem(274),
          transition: transitions.create(
            ['margin-left', 'margin-right'],
            {
              easing: transitions.easing.easeInOut,
              duration: transitions.duration.standard,
            },
          ),
        },
      })}
    >
      {children}
    </MDBox>
  );
}

export default DashboardLayout;
