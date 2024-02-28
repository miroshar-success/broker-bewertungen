import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import brokerComparableSelectors from 'src/modules/broker/comparable/brokerComparableSelectors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function ComparableBrokers({ record }) {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    brokerComparableSelectors.selectLoading,
  );
  const hasRows = useSelector(
    brokerComparableSelectors.selectHasRows,
  );
  const rows = useSelector(
    brokerComparableSelectors.selectRows,
  );
  if (loading || !hasRows || !rows) {
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
              {`${record.name
                .replace(/\([\w\d\s]+\)/g, '')
                .trim()} vergleichen mit`}
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {rows
            .filter(({ id }) => id !== record.id)
            .map((row, idx) => (
              <MDTypography
                key={idx}
                variant="body2"
                fontWeight="regular"
                color={sidenavColor}
              >
                <MaterialLink
                  component={Link}
                  to={`/forex-cfd-broker-vergleich/${record.name_normalized}-versus-${row.name_normalized}`}
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

ComparableBrokers.propTypes = {};

export default ComparableBrokers;
