import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import categorySidebarSelectors from 'src/modules/category/sidebar/categorySidebarSelectors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function Category() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    categorySidebarSelectors.selectLoading,
  );
  const record = useSelector(
    categorySidebarSelectors.selectRecord,
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
              Broker-Kategorien
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {record?.rows.map((cat) => (
            <MDTypography
              key={cat.id}
              variant="body2"
              color={sidenavColor}
              fontWeight="regular"
            >
              <MaterialLink
                component={Link}
                to={cat.link}
                underline="hover"
              >
                {cat.name}
              </MaterialLink>
            </MDTypography>
          ))}
        </MDBox>
      </Card>
    </Grid>
  );
}

Category.propTypes = {};

export default Category;
