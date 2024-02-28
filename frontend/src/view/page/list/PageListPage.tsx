import React from 'react';
import { i18n } from 'src/i18n';
import PageListFilter from 'src/view/page/list/PageListFilter';
import PageListTable from 'src/view/page/list/PageListTable';
import PageListToolbar from 'src/view/page/list/PageListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PageListPage(props) {
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
              {i18n('entities.generalPage.list.title')}
            </MDTypography>
            <PageListToolbar />
          </MDBox>
          <PageListFilter />
        </MDBox>
        <PageListTable />
      </Card>
    </>
  );
}

export default PageListPage;
