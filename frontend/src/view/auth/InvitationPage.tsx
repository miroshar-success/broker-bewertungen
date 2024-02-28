import { Button, Card } from '@mui/material';
import { i18n } from 'src/i18n';
import invitationActions from 'src/modules/tenant/invitation/tenantInvitationActions';
import { getHistory } from 'src/modules/store';
import queryString from 'query-string';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Spinner from 'src/view/shared/Spinner';
import invitationSelectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import authActions from 'src/modules/auth/authActions';
import { useLocation } from 'react-router-dom';
import selectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import { BrandLogo } from 'src/assets/resources';
import MDTypography from 'src/mui/components/MDTypography';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';
import { Link } from 'react-router-dom';
import MDButton from 'src/mui/components/MDButton';

function InviationPage() {
  const dispatch = useDispatch();
  const location = useLocation();

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const loading = useSelector(
    invitationSelectors.selectLoading,
  );
  const warningMessage = useSelector(
    invitationSelectors.selectWarningMessage,
  );

  const token = queryString.parse(location.search).token;

  useEffect(() => {
    dispatch(invitationActions.doAcceptFromAuth(token));
  }, [dispatch, token]);

  const doAcceptWithWrongEmail = () => {
    dispatch(
      invitationActions.doAcceptFromAuth(token, true),
    );
  };

  const doSignout = async () => {
    await dispatch(authActions.doSignout());
    getHistory().push('/admin');
  };

  return (
    <CoverLayout
      image={backgroundImageUrl || '/images/invitation.jpg'}
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
          {loading && <Spinner />}

          {Boolean(warningMessage) && (
            <MDTypography variant="h6" align="center">
              {warningMessage}
            </MDTypography>
          )}

          <MDBox
            mt={3}
            display="flex"
            justifyContent="center"
          >
            {Boolean(warningMessage) && (
              <MDButton
                variant="gradient"
                color="info"
                type="button"
                fullWidth
                onClick={doAcceptWithWrongEmail}
              >
                {i18n('tenant.invitation.acceptWrongEmail')}
              </MDButton>
            )}

            {!loading && (
              <MDTypography
                variant="button"
                color="info"
                component={Link}
                to="#"
                onClick={doSignout}
                fontWeight="medium"
                textGradient
              >
                {i18n('auth.signout')}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default InviationPage;
