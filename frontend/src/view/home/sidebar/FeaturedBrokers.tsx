import { Card, CardHeader, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import brokerFeaturedSelectors from 'src/modules/broker/featured/brokerFeaturedSelectors';
import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';

function FeaturedBrokers() {
  const { sidenavColor } = selectMuiSettings();
  const loading = useSelector(
    brokerFeaturedSelectors.selectLoading,
  );
  const hasRows = useSelector(
    brokerFeaturedSelectors.selectHasRows,
  );
  const rows = useSelector(
    brokerFeaturedSelectors.selectRows,
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
              Broker vorgestellt
            </MDTypography>
          }
          sx={{ pb: 1, px: 3, pt: 2 }}
        />
        <MDBox sx={{ pt: 0, px: 3, pb: 2 }}>
          <Grid spacing={2} container>
            {rows.map((row, idx) => (
              <Grid key={row.id} xs={12} item>
                <MDBox
                  display="flex"
                  flexDirection="column"
                  sx={{
                    '& > * + *': {
                      mt: 1,
                    },
                  }}
                >
                  <MaterialLink
                    href={row.meta?.homepage}
                    target="_blank"
                  >
                    <ImageView
                      value={
                        row.broker_image_broker_detail_logo
                      }
                      sx={{
                        width: '100%',
                      }}
                    />
                  </MaterialLink>
                  <MDBox mx="auto">
                    <RatingViewItem
                      value={row.rating?.overall_rating}
                      precision={0.1}
                      emptyIcon={
                        <img
                          src="/images/star-grey.png"
                          alt="star-grey"
                          height="24px"
                        />
                      }
                      icon={
                        <img
                          src="/images/star-fill.png"
                          alt="star-fill"
                          height="24px"
                        />
                      }
                      size="large"
                    />
                  </MDBox>
                  <MDTypography
                    variant="body2"
                    fontWeight="regular"
                    color={sidenavColor}
                    mx="auto"
                    mt={1}
                  >
                    <MaterialLink
                      component={Link}
                      to={`/erfahrungsberichte/${row.name_normalized}`}
                      underline="hover"
                    >
                      {`${row.name} Erfahrungen`}
                    </MaterialLink>
                  </MDTypography>
                </MDBox>
              </Grid>
            ))}
          </Grid>
        </MDBox>
      </Card>
    </Grid>
  );
}

FeaturedBrokers.propTypes = {};

export default FeaturedBrokers;
