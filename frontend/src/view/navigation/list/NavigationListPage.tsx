import React from 'react';
import { i18n } from 'src/i18n';
import NavigationListFilter from 'src/view/navigation/list/NavigationListFilter';
import NavigationListTable from 'src/view/navigation/list/NavigationListTable';
import NavigationListToolbar from 'src/view/navigation/list/NavigationListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function NavigationListPage(props) {
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
              {i18n('entities.navigation.list.title')}
            </MDTypography>
            <NavigationListToolbar />
          </MDBox>
          <NavigationListFilter />
        </MDBox>
        <NavigationListTable />
      </Card>
    </>
  );
}

export default NavigationListPage;
