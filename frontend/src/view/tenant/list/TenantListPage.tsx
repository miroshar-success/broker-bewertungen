import React from 'react';
import TenantListFilter from 'src/view/tenant/list/TenantListFilter';
import TenantListTable from 'src/view/tenant/list/TenantListTable';
import TenantListToolbar from 'src/view/tenant/list/TenantListToolbar';
import { i18n } from 'src/i18n';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function TenantListPage(props) {
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
              {i18n('tenant.list.title')}
            </MDTypography>
            <TenantListToolbar />
          </MDBox>
          <TenantListFilter />
        </MDBox>
        <TenantListTable />
      </Card>
    </>
  );
}

export default TenantListPage;
