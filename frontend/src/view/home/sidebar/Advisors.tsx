import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function Advisors({ record }) {
  const { sidenavColor } = selectMuiSettings();
  if (
    !record ||
    ((!record.blogs || !record.blogs.length) &&
      (!record.articles || !record.articles.length))
  ) {
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
              Ratgeber
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          {record.blogs.map((row, idx) => (
            <MDTypography
              key={idx}
              variant="body2"
              fontWeight="regular"
              color={sidenavColor}
            >
              <MaterialLink
                component={Link}
                to={`/blog/${row.name_normalized}`}
                underline="hover"
              >
                {row.name}
              </MaterialLink>
            </MDTypography>
          ))}
          {record.articles.map((row, idx) => (
            <MDTypography
              key={idx}
              variant="body2"
              fontWeight="regular"
              color={sidenavColor}
            >
              <MaterialLink
                component={Link}
                to={`/${record.name_normalized}/${row.name_normalized}`}
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

Advisors.propTypes = {};

export default Advisors;
