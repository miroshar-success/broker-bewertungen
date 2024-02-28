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

// @mui material components
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Icon from '@mui/material/Icon';
import { Theme } from '@mui/material/styles';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Material Dashboard 2 PRO React TS Base Styles
import typography from 'src/mui/assets/theme/base/typography';

function Footer({
  light,
}: {
  light?: boolean;
}): JSX.Element {
  const { size } = typography;

  return (
    <MDBox
      position="absolute"
      width="100%"
      bottom={0}
      py={4}
    >
      <Container>
        <MDBox
          width="100%"
          display="flex"
          flexDirection={{ xs: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          px={1.5}
        >
          <MDBox
            display="flex"
            justifyContent="center"
            alignItems="center"
            flexWrap="wrap"
            color={light ? 'white' : 'text'}
            fontSize={size.sm}
          ></MDBox>
          <MDBox
            component="ul"
            sx={({ breakpoints }: Theme) => ({
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'center',
              listStyle: 'none',
              mt: 3,
              mb: 0,
              p: 0,

              [breakpoints.up('lg')]: {
                mt: 0,
              },
            })}
          >
            <MDBox component="li" px={2} lineHeight={1}>
              <Link
                href="https://www.creative-tim.com/presentation"
                target="_blank"
              >
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  About Us
                </MDTypography>
              </Link>
            </MDBox>
            <MDBox component="li" pl={2} lineHeight={1}>
              <Link
                href="https://www.creative-tim.com/license"
                target="_blank"
              >
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color={light ? 'white' : 'dark'}
                >
                  License
                </MDTypography>
              </Link>
            </MDBox>
          </MDBox>
        </MDBox>
      </Container>
    </MDBox>
  );
}

// Declaring default props for Footer
Footer.defaultProps = {
  light: false,
};

export default Footer;
