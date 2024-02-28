import { useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import actions from 'src/modules/auth/authActions';
import { useSelector } from 'react-redux';
import selectors from 'src/modules/auth/authSelectors';
import MDBox from 'src/mui/components/MDBox';
import { Card } from '@mui/material';
import { BrandLogo } from 'src/assets/resources';
import BasicLayout from 'src/mui/shared/Layouts/BasicLayout';
import MDTypography from 'src/mui/components/MDTypography';
import { Link } from 'react-router-dom';
import CoverLayout from 'src/mui/shared/Layouts/CoverLayout';

function EmptyPermissionsPage(props) {
  const dispatch = useDispatch();

  const backgroundImageUrl = useSelector(
    selectors.selectBackgroundImageUrl,
  );

  const doSignout = () => {
    dispatch(actions.doSignout());
  };

  return (
    <CoverLayout
      image={
        backgroundImageUrl || '/images/emptyPermissions.jpg'
      }
    >
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
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
          <MDTypography variant="h6" textAlign="center">
            {i18n('auth.emptyPermissions.message')}
          </MDTypography>
          <MDBox
            display="flex"
            pt={4}
            pb={2}
            justifyContent="center"
          >
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
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default EmptyPermissionsPage;
