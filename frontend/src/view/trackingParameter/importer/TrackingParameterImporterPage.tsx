import { Card } from '@mui/material';
import { i18n } from 'src/i18n';
import actions from 'src/modules/trackingParameter/importer/trackingParameterImporterActions';
import fields from 'src/modules/trackingParameter/importer/trackingParameterImporterFields';
import selectors from 'src/modules/trackingParameter/importer/trackingParameterImporterSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import importerHoc from 'src/view/shared/importer/Importer';

function TrackingParameterImportPage() {
  const Importer = importerHoc(
    selectors,
    actions,
    fields,
    i18n('entities.trackingParameter.importer.hint'),
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
                'entities.trackingParameter.importer.title',
              )}
            </MDTypography>
          </MDBox>
        </MDBox>
        <Importer />
      </Card>
    </>
  );
}

export default TrackingParameterImportPage;
