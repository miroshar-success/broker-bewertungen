import React from 'react';
import { i18n } from 'src/i18n';
import AffiliateLinkListFilter from 'src/view/affiliateLink/list/AffiliateLinkListFilter';
import AffiliateLinkListTable from 'src/view/affiliateLink/list/AffiliateLinkListTable';
import AffiliateLinkListToolbar from 'src/view/affiliateLink/list/AffiliateLinkListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function AffiliateLinkListPage(props) {
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
              {i18n('entities.affiliateLink.list.title')}
            </MDTypography>
            <AffiliateLinkListToolbar />
          </MDBox>
          <AffiliateLinkListFilter />
        </MDBox>
        <AffiliateLinkListTable />
      </Card>
    </>
  );
}

export default AffiliateLinkListPage;
