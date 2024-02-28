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

// @mui material components
import Grid from '@mui/material/Grid';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS examples components
import DefaultNavbar from 'src/mui/shared/Navbars/DefaultNavbar';
import PageLayout from 'src/mui/shared/Layouts/PageLayout';

// Material Dashboard 2 PRO React page layout routes

// for MUI 2 Dashboard
import muiActions from 'src/modules/mui/muiActions';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

// Declaring props types for IllustrationLayout
interface Props {
  header?: ReactNode;
  title?: string;
  description?: string;
  children: ReactNode;
  illustration?: string;
}

function IllustrationLayout({
  header,
  title,
  description,
  illustration,
  children,
}: Props): JSX.Element {
  const { darkMode } = selectMuiSettings();

  return (
    <PageLayout background="white">
      <DefaultNavbar
        routes={[]}
        // routes={pageRoutes}
        action={{
          type: 'external',
          route:
            'https://creative-tim.com/product/material-dashboard-2-pro-react-ts',
          label: 'buy now',
          color: 'info',
        }}
      />
      <Grid
        container
        sx={{
          backgroundColor: ({
            palette: { background, white },
          }) =>
            darkMode ? background.default : white.main,
        }}
      >
        <Grid item xs={12} lg={6}>
          <MDBox
            display={{ xs: 'none', lg: 'flex' }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${illustration})` }}
          />
        </Grid>
        <Grid
          item
          xs={11}
          sm={8}
          md={6}
          lg={4}
          xl={3}
          sx={{ mx: 'auto' }}
        >
          <MDBox
            display="flex"
            flexDirection="column"
            justifyContent="center"
            height="100vh"
          >
            <MDBox py={3} px={3} textAlign="center">
              {!header ? (
                <>
                  <MDBox mb={1} textAlign="center">
                    <MDTypography
                      variant="h4"
                      fontWeight="bold"
                    >
                      {title}
                    </MDTypography>
                  </MDBox>
                  <MDTypography
                    variant="body2"
                    color="text"
                  >
                    {description}
                  </MDTypography>
                </>
              ) : (
                header
              )}
            </MDBox>
            <MDBox p={3}>{children}</MDBox>
          </MDBox>
        </Grid>
      </Grid>
    </PageLayout>
  );
}

// Declaring default props for IllustrationLayout
IllustrationLayout.defaultProps = {
  header: '',
  title: '',
  description: '',
  illustration: '',
};

export default IllustrationLayout;
