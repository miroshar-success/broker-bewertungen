import React from 'react';
import { i18n } from 'src/i18n';
import BlogListFilter from 'src/view/blog/list/BlogListFilter';
import BlogListTable from 'src/view/blog/list/BlogListTable';
import BlogListToolbar from 'src/view/blog/list/BlogListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function BlogListPage(props) {
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
              {i18n('entities.blog.list.title')}
            </MDTypography>
            <BlogListToolbar />
          </MDBox>
          <BlogListFilter />
        </MDBox>
        <BlogListTable />
      </Card>
    </>
  );
}

export default BlogListPage;
