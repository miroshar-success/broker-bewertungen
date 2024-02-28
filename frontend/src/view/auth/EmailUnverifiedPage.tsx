import { Button, Card } from '@mui/material';
import React from 'react';
import { i18n, i18nHtml } from 'src/i18n';
import { useDispatch, useSelector } from 'react-redux';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import { BrandLogo } from 'src/assets/resources';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import { Link } from 'react-router-dom';

function EmailUnverifiedPage() {
  const dispatch = useDispatch();

  const email = useSelector(
    selectors.selectCurrentUserEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingEmailConfirmation,
  );
  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doSubmit = () => {
    dispatch(actions.doSendEmailConfirmation());
  };

  return (
    <CoverLayout
      image={
        backgroundImageUrl || '/images/emailUnverified.jpg'
      }
    >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDBox
            display="flex"
            justifyContent="center"
            py={2}
          >
            <BrandLogo width="80%" />
          </MDBox>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDTypography variant="h6" align="center">
            {i18nHtml(
              'auth.emailUnverified.message',
              email,
            )}
          </MDTypography>

          <MDBox mt={4}>
            <MDButton
              variant="gradient"
              color="info"
              type="submit"
              fullWidth
              disabled={loading}
              onClick={doSubmit}
            >
              {i18n('auth.emailUnverified.submit')}
            </MDButton>
          </MDBox>

          <MDBox my={3} textAlign="center">
            <MDTypography
              variant="button"
              color="info"
              component={Link}
              to="#"
              onClick={doSignout}
              fontWeight="medium"
              textGradient
            >
              {i18n('auth.signinWithAnotherAccount')}
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default EmailUnverifiedPage;
