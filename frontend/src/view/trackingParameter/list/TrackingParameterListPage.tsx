import React from 'react';
import { i18n } from 'src/i18n';
import TrackingParameterListFilter from 'src/view/trackingParameter/list/TrackingParameterListFilter';
import TrackingParameterListTable from 'src/view/trackingParameter/list/TrackingParameterListTable';
import TrackingParameterListToolbar from 'src/view/trackingParameter/list/TrackingParameterListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function TrackingParameterListPage(props) {
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
              {i18n(
                'entities.trackingParameter.list.title',
              )}
            </MDTypography>
            <TrackingParameterListToolbar />
          </MDBox>
          <TrackingParameterListFilter />
        </MDBox>
        <TrackingParameterListTable />
      </Card>
    </>
  );
}

export default TrackingParameterListPage;
