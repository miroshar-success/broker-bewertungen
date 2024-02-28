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
import { useDispatch, useSelector } from 'react-redux';

// react-router-dom components
import { useLocation } from 'react-router-dom';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import navigationHomeSelectors from 'src/modules/navigation/home/navigationHomeSelectors';
import DefaultNavbar from 'src/mui/shared/Navbars/DefaultNavbar';
import Footer from 'src/view/home/Footer';

// Declaring props types for PageLayout
interface Props {
  background?: 'white' | 'light' | 'default';
  children?: ReactNode;
  fixedNavBar?: boolean;
  hideNavbar?: boolean;
  hideFooter?: boolean;
}

function PageLayout({
  background,
  children,
  fixedNavBar = true,
  hideNavbar,
  hideFooter,
}: Props): JSX.Element {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const loading = useSelector(
    navigationHomeSelectors.selectLoading,
  );
  const navigation = useSelector(
    navigationHomeSelectors.selectNavigation,
  );

  useEffect(() => {
    dispatch(muiActions.doLayout('page'));
  }, [pathname]);

  return (
    <MDBox
      height="100%"
      minHeight="100vh"
      bgColor={background}
      sx={{ overflowX: 'hidden' }}
    >
      {!hideNavbar && !loading && (
        <DefaultNavbar
          routes={navigation}
          transparent={fixedNavBar}
          light={background === 'light'}
          fixed={fixedNavBar}
        />
      )}
      {children}
      {!hideFooter && <Footer />}
    </MDBox>
  );
}

// Declaring default props for PageLayout
PageLayout.defaultProps = {
  background: 'default',
  hideNavbar: false,
  hideFooter: false,
};

export default PageLayout;
