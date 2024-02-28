import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import navigationForexSchoolSelectors from 'src/modules/navigation/forexSchool/navigationForexSchoolSelectors';

function ForexSchool() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    navigationForexSchoolSelectors.selectLoading,
  );
  const record = useSelector(
    navigationForexSchoolSelectors.selectNavigation,
  );
  if (loading || !record || !record.rows || !record.count) {
    return null;
  }
  return (
    <Grid xs={12} item>
      <Card>
        <CardHeader
          title={
            <MDTypography
              variant="body1"
              fontWeight="bold"
              lineHeight={1.35}
            >
              Forex-Schule
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {record.rows.map((row) => (
            <MDTypography
              key={row.id}
              variant="body2"
              color={sidenavColor}
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                to={row.link}
                underline="hover"
              >
                {row.name}
              </MaterialLink>
            </MDTypography>
          ))}
        </MDBox>
      </Card>
    </Grid>
  );
}

ForexSchool.propTypes = {};

export default ForexSchool;
