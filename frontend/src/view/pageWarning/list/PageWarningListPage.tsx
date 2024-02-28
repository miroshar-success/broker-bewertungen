import React from 'react';
import { i18n } from 'src/i18n';
import PageWarningListFilter from 'src/view/pageWarning/list/PageWarningListFilter';
import PageWarningListTable from 'src/view/pageWarning/list/PageWarningListTable';
import PageWarningListToolbar from 'src/view/pageWarning/list/PageWarningListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PageWarningListPage(props) {
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
              {i18n('entities.pageWarning.list.title')}
            </MDTypography>
            <PageWarningListToolbar />
          </MDBox>
          <PageWarningListFilter />
        </MDBox>
        <PageWarningListTable />
      </Card>
    </>
  );
}

export default PageWarningListPage;
