import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import PasswordChangeForm from 'src/view/auth/PasswordChangeForm';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

import backgroundImage from 'src/mui/assets/images/bg-profile.jpeg';

function PasswordChangeFormPage(props) {
  return (
    <>
      <MDBox position="relative" mb={5}>
        <MDBox
          display="flex"
          alignItems="center"
          position="relative"
          minHeight="18.75rem"
          borderRadius="xl"
          sx={{
            backgroundImage: ({
              functions: { rgba, linearGradient },
              palette: { gradients },
            }) =>
              `${linearGradient(
                rgba(gradients.info.main, 0.6),
                rgba(gradients.info.state, 0.6),
              )}, url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: '50%',
            overflow: 'hidden',
          }}
        />
        <Card
          sx={{
            position: 'relative',
            mt: -8,
            mx: 3,
            py: 2,
            px: 2,
          }}
        >
          <MDBox p={3}>
            <MDTypography variant="h3">
              {i18n('auth.passwordChange.title')}
            </MDTypography>
          </MDBox>
          <PasswordChangeForm
            onCancel={() => getHistory().push('/admin')}
          />
        </Card>
      </MDBox>
    </>
  );
}

export default PasswordChangeFormPage;
