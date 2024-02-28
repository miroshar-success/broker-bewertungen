import React from 'react';
import { i18n } from 'src/i18n';
import PromotionListFilter from 'src/view/promotion/list/PromotionListFilter';
import PromotionListTable from 'src/view/promotion/list/PromotionListTable';
import PromotionListToolbar from 'src/view/promotion/list/PromotionListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function PromotionListPage(props) {
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
              {i18n('entities.promotion.list.title')}
            </MDTypography>
            <PromotionListToolbar />
          </MDBox>
          <PromotionListFilter />
        </MDBox>
        <PromotionListTable />
      </Card>
    </>
  );
}

export default PromotionListPage;
