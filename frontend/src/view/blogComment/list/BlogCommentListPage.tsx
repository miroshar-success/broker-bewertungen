import React from 'react';
import { i18n } from 'src/i18n';
import BlogCommentListFilter from 'src/view/blogComment/list/BlogCommentListFilter';
import BlogCommentListTable from 'src/view/blogComment/list/BlogCommentListTable';
import BlogCommentListToolbar from 'src/view/blogComment/list/BlogCommentListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function BlogCommentListPage(props) {
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
              {i18n('entities.blogComment.list.title')}
            </MDTypography>
            <BlogCommentListToolbar />
          </MDBox>
          <BlogCommentListFilter />
        </MDBox>
        <BlogCommentListTable />
      </Card>
    </>
  );
}

export default BlogCommentListPage;
