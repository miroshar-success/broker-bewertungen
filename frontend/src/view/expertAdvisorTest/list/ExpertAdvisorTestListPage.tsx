import React from 'react';
import { i18n } from 'src/i18n';
import ExpertAdvisorTestListFilter from 'src/view/expertAdvisorTest/list/ExpertAdvisorTestListFilter';
import ExpertAdvisorTestListTable from 'src/view/expertAdvisorTest/list/ExpertAdvisorTestListTable';
import ExpertAdvisorTestListToolbar from 'src/view/expertAdvisorTest/list/ExpertAdvisorTestListToolbar';
import { Card } from '@mui/material';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ExpertAdvisorTestListExpertAdvisorTest(props) {
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
                'entities.expertAdvisorTest.list.title',
              )}
            </MDTypography>
            <ExpertAdvisorTestListToolbar />
          </MDBox>
          <ExpertAdvisorTestListFilter />
        </MDBox>
        <ExpertAdvisorTestListTable />
      </Card>
    </>
  );
}

export default ExpertAdvisorTestListExpertAdvisorTest;
