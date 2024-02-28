import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import queryString from 'query-string';
import { Link, useLocation } from 'react-router-dom';
import { Button, Card } from '@mui/material';
import { getHistory } from 'src/modules/store';
import MDBox from 'src/mui/components/MDBox';
import { BrandLogo } from 'src/assets/resources';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import MDTypography from 'src/mui/components/MDTypography';
import MDButton from 'src/mui/components/MDButton';

function VerifyEmailPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = queryString.parse(location.search).token;

  const signedIn = useSelector(selectors.selectSignedIn);
  const errorMessage = useSelector(
    selectors.selectErrorMessageVerifyEmail,
  );
  const loading = useSelector(
    selectors.selectLoadingVerifyEmail,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  useEffect(() => {
    dispatch(actions.doVerifyEmail(token));
  }, [dispatch, token]);

  const doSignout = async () => {
    await dispatch(actions.doSignout());
    getHistory().push('/admin');
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
          {loading && (
            <MDTypography variant="h6" align="center">
              {i18n('auth.verifyEmail.message')}
            </MDTypography>
          )}
          {!loading && !errorMessage && (
            <MDTypography
              variant="h6"
              align="center"
              color="success"
            >
              {i18n('auth.verifyEmail.success')}
            </MDTypography>
          )}
          {!loading && errorMessage && (
            <MDTypography variant="h6" align="center">
              {errorMessage}
            </MDTypography>
          )}
          <MDBox
            mt={3}
            display="flex"
            justifyContent="center"
          >
            {!loading && errorMessage && (
              <MDButton
                variant="gradient"
                color="info"
                type="button"
                fullWidth
                onClick={doSignout}
              >
                {i18n('auth.signout')}
              </MDButton>
            )}
            {!loading && !errorMessage && !signedIn && (
              <MDButton
                component={Link}
                to="/admin/auth/signin"
                variant="gradient"
                color="info"
                type="button"
                fullWidth
              >
                {i18n('auth.signin')}
              </MDButton>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default VerifyEmailPage;
