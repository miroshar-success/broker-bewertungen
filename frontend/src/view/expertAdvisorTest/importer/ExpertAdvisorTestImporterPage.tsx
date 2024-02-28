import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/expertAdvisorTest/importer/expertAdvisorTestImporterActions';
import fields from 'src/modules/expertAdvisorTest/importer/expertAdvisorTestImporterFields';
import selectors from 'src/modules/expertAdvisorTest/importer/expertAdvisorTestImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

function ExpertAdvisorTestImportExpertAdvisorTest() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.expertAdvisorTest.importer.hint'),
  );

  return (
    <>
      <Card>
        <MDBox px={3} pt={3}>
          <MDBox
            pb={3}
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <MDTypography variant="h3">
              {i18n(
                'entities.expertAdvisorTest.importer.title',
              )}
            </MDTypography>
          </MDBox>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default ExpertAdvisorTestImportExpertAdvisorTest;
