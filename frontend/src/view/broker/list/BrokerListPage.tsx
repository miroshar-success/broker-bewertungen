import React from 'react';
import { i18n } from 'src/i18n';
import BrokerListFilter from 'src/view/broker/list/BrokerListFilter';
import BrokerListTable from 'src/view/broker/list/BrokerListTable';
import BrokerListToolbar from 'src/view/broker/list/BrokerListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function BrokerListPage(props) {
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
              {i18n('entities.broker.list.title')}
            </MDTypography>
            <BrokerListToolbar />
          </MDBox>
          <BrokerListFilter />
        </MDBox>
        <BrokerListTable />
      </Card>
    </>
  );
}

export default BrokerListPage;
