import Card from '@mui/material/Card';
import React from 'react';
import MDBox from 'src/mui/components/MDBox';
import { i18n } from 'src/i18n';
import UserFilter from 'src/view/user/list/UserFilter';
import UserTable from 'src/view/user/list/UserTable';
import UserToolbar from 'src/view/user/list/UserToolbar';
import MDTypography from 'src/mui/components/MDTypography';

function UserPage() {
  return (
    <>
      <Card>
        <MDBox pt={3} px={3}>
          <MDBox
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
            pb={3}
          >
            <MDTypography variant="h3">
              {i18n('user.title')}
            </MDTypography>
            <UserToolbar />
          </MDBox>
          <UserFilter />
        </MDBox>
        <UserTable />
      </Card>
    </>
  );
}

export default UserPage;
