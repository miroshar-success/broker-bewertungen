import React from 'react';
import { i18n } from 'src/i18n';
import OpenxListFilter from 'src/view/openx/list/OpenxListFilter';
import OpenxListTable from 'src/view/openx/list/OpenxListTable';
import OpenxListToolbar from 'src/view/openx/list/OpenxListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function OpenxListPage(props) {
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
              {i18n('entities.openx.list.title')}
            </MDTypography>
            <OpenxListToolbar />
          </MDBox>
          <OpenxListFilter />
        </MDBox>
        <OpenxListTable />
      </Card>
    </>
  );
}

export default OpenxListPage;
