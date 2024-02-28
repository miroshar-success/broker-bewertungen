import React from 'react';
import { i18n } from 'src/i18n';
import AuthorListFilter from 'src/view/author/list/AuthorListFilter';
import AuthorListTable from 'src/view/author/list/AuthorListTable';
import AuthorListToolbar from 'src/view/author/list/AuthorListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function AuthorListPage(props) {
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
              {i18n('entities.author.list.title')}
            </MDTypography>
            <AuthorListToolbar />
          </MDBox>
          <AuthorListFilter />
        </MDBox>
        <AuthorListTable />
      </Card>
    </>
  );
}

export default AuthorListPage;
