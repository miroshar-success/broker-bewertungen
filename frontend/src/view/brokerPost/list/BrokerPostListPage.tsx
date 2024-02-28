import React from 'react';
import { i18n } from 'src/i18n';
import BrokerPostListFilter from 'src/view/brokerPost/list/BrokerPostListFilter';
import BrokerPostListTable from 'src/view/brokerPost/list/BrokerPostListTable';
import BrokerPostListToolbar from 'src/view/brokerPost/list/BrokerPostListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function BrokerPostListPage(props) {
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
              {i18n('entities.brokerPost.list.title')}
            </MDTypography>
            <BrokerPostListToolbar />
          </MDBox>
          <BrokerPostListFilter />
        </MDBox>
        <BrokerPostListTable />
      </Card>
    </>
  );
}

export default BrokerPostListPage;
