import React from 'react';
import { i18n } from 'src/i18n';
import CategoryListFilter from 'src/view/category/list/CategoryListFilter';
import CategoryListTable from 'src/view/category/list/CategoryListTable';
import CategoryListToolbar from 'src/view/category/list/CategoryListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function CategoryListPage(props) {
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
              {i18n('entities.category.list.title')}
            </MDTypography>
            <CategoryListToolbar />
          </MDBox>
          <CategoryListFilter />
        </MDBox>
        <CategoryListTable />
      </Card>
    </>
  );
}

export default CategoryListPage;
