import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import selectors from 'src/modules/auth/authSelectors';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TenantNewForm from 'src/view/auth/TenantNewForm';
import TenantSelectForm from 'src/view/auth/TenantSelectForm';

// @mui material components
import Card from '@mui/material/Card';

// Material Dashboard 2 PRO React TS components
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

// Authentication layout components
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';

// Images
import bgImage from 'src/mui/assets/images/bg-sign-up-cover.jpeg';
import { BrandLogo } from 'src/assets/resources';

import { Link } from 'react-router-dom';

function TenantPage(): JSX.Element {
  const [view, setView] = useState('form');
  const dispatch = useDispatch();

  const invitedTenants = useSelector(
    selectors.selectInvitedTenants,
  );

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );
  const logoUrl = useSelector(selectors.selectLogoUrl);

  useEffect(() => {
    setView(invitedTenants.length ? 'select' : 'form');
  }, [invitedTenants]);

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  const doToggleView = () => {
    setView((prevView) =>
      prevView === 'form' ? 'select' : 'form',
    );
  };

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
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
          {view === 'form' ? (
            <TenantNewForm onViewToggle={doToggleView} />
          ) : (
            <TenantSelectForm onViewToggle={doToggleView} />
          )}
          <MDBox mt={3} mb={1} textAlign="center">
            <MDTypography variant="button" color="text">
              <MDTypography
                component={Link}
                to="#"
                variant="button"
                color="info"
                fontWeight="medium"
                onClick={doSignout}
                textGradient
              >
                {i18n('auth.signout')}
              </MDTypography>
            </MDTypography>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default TenantPage;
