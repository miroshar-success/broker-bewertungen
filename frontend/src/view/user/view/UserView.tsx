import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import CustomViewItem from 'src/view/shared/view/CustomViewItem';
import LogoViewItem from 'src/view/shared/view/LogoViewItem';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import Roles from 'src/security/roles';
import Spinner from 'src/view/shared/Spinner';
import TextViewItem from 'src/view/shared/view/TextViewItem';
import UserStatusView from 'src/view/user/view/UserStatusView';

function UserView(props) {
  const { user, loading } = props;
  const { sidenavColor } = selectMuiSettings();

  if (loading || !user) {
    return <Spinner />;
  }

  return (
    <Grid container spacing={2} mb={6}>
      <Grid item xs={12} md={3} xl={3}>
        <MDBox
          display="flex"
          justifyContent="center"
          px={3}
        >
          <LogoViewItem
            label={i18n('user.fields.avatars')}
            value={user.avatars}
          />
        </MDBox>
      </Grid>
      <Grid
        item
        container
        xs={12}
        md={6}
        xl={6}
        spacing={2}
      >
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('user.fields.email')}
            value={user.email}
          />
        </Grid>
        <Grid container item spacing={2}>
          <Grid item xs={12} md={6} xl={6}>
            <TextViewItem
              label={i18n('user.fields.firstName')}
              value={user.firstName}
            />
          </Grid>
          <Grid item xs={12} md={6} xl={6}>
            <TextViewItem
              label={i18n('user.fields.lastName')}
              value={user.lastName}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TextViewItem
            label={i18n('user.fields.phoneNumber')}
            value={user.phoneNumber}
            prefix={'+'}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomViewItem
            label={i18n('user.fields.roles')}
            value={user.roles}
            render={(value) =>
              value.map((roleId) => (
                <MDBadgeDot
                  key={roleId}
                  width="max-content"
                  badgeContent={Roles.labelOf(roleId)}
                  color={sidenavColor}
                  variant="contained"
                  size="md"
                />
              ))
            }
          />
        </Grid>
        <Grid item xs={12}>
          <UserStatusView value={user.status} />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default UserView;
