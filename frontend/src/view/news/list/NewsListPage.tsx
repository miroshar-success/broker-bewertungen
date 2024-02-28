import React from 'react';
import { i18n } from 'src/i18n';
import NewsListFilter from 'src/view/news/list/NewsListFilter';
import NewsListTable from 'src/view/news/list/NewsListTable';
import NewsListToolbar from 'src/view/news/list/NewsListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function NewsListPage(props) {
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
              {i18n('entities.news.list.title')}
            </MDTypography>
            <NewsListToolbar />
          </MDBox>
          <NewsListFilter />
        </MDBox>
        <NewsListTable />
      </Card>
    </>
  );
}

export default NewsListPage;
