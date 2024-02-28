import { i18n } from 'src/i18n';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import BrokerAttrs from 'src/view/home/broker/shared/BrokerAttrs';
import BrokerLinks from 'src/view/home/broker/shared/BrokerLinks';
import BrokerUpsides from 'src/view/home/broker/shared/BrokerUpsides';
import CheckboxViewItem from 'src/view/shared/view/CheckboxViewItem';
import CompareDetail from 'src/view/home/broker/comparisons/CompareDetail';
import CompareSection from 'src/view/home/broker/comparisons/CompareSection';
import Grid from '@mui/material/Grid';
import ImageView from 'src/view/home/ImageView';
import MaterialLink from '@mui/material/Link';
import MDBox from 'src/mui/components/MDBox';
import OverallRating from 'src/view/home/broker/shared/OverallRating';
import PropTypes from 'prop-types';

function CompareOverview({ recordA, recordB }) {
  return (
    <>
      <Grid spacing={2} container>
        <CompareSection name="logo" />
        <CompareDetail
          childrenA={
            <MaterialLink
              href={recordA.meta.homepage}
              target="_blank"
            >
              <ImageView
                value={
                  recordA.broker_image_broker_detail_logo
                }
                alt={recordA.name}
              />
            </MaterialLink>
          }
          childrenB={
            <MaterialLink
              href={recordB.meta.homepage}
              target="_blank"
            >
              <ImageView
                value={
                  recordB.broker_image_broker_detail_logo
                }
                alt={recordA.name}
              />
            </MaterialLink>
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="brokerType" />
        <CompareDetail
          childrenA={
            <AttrTypography>
              {i18n(
                `entities.broker.enumerators.meta.broker_type.${recordA.meta?.broker_type}`,
              )}
            </AttrTypography>
          }
          childrenB={
            <AttrTypography>
              {i18n(
                `entities.broker.enumerators.meta.broker_type.${recordB.meta?.broker_type}`,
              )}
            </AttrTypography>
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="overallRating" />
        <CompareDetail
          childrenA={
            <OverallRating
              record={recordA}
              size={30}
              gap={1}
              compare
            />
          }
          childrenB={
            <OverallRating
              record={recordB}
              size={30}
              gap={1}
              compare
            />
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="customerReviews" />
        <CompareDetail
          childrenA={
            <AttrTypography>
              <MaterialLink
                href={`/erfahrungsberichte/${recordA.name_normalized}`}
                underline="hover"
              >
                {`${recordA.name
                  .replace(/\([\w\d\s]+\)/g, '')
                  .trim()} Erfahrungen`}
              </MaterialLink>
            </AttrTypography>
          }
          childrenB={
            <AttrTypography>
              <MaterialLink
                href={`/erfahrungsberichte/${recordB.name_normalized}`}
                underline="hover"
              >
                {`${recordB.name
                  .replace(/\([\w\d\s]+\)/g, '')
                  .trim()} Erfahrungen`}
              </MaterialLink>
            </AttrTypography>
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="links" />
        <CompareDetail
          childrenA={<BrokerLinks record={recordA} />}
          childrenB={<BrokerLinks record={recordB} />}
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="brokerFeature" />
        <CompareDetail
          childrenA={
            <BrokerAttrs
              records={recordA.features}
              attrs={{
                link: 'url',
                title: 'feature',
              }}
            />
          }
          childrenB={
            <BrokerAttrs
              records={recordB.features}
              attrs={{
                link: 'url',
                title: 'feature',
              }}
            />
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="customerReviews" />
        <CompareDetail
          childrenA={<BrokerUpsides record={recordA} />}
          childrenB={<BrokerUpsides record={recordB} />}
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="scalping" />
        <CompareDetail
          childrenA={
            <MDBox position="relative" my={1} pl={3}>
              <CheckboxViewItem
                checked={recordA.meta?.scalping_allowed}
              />
            </MDBox>
          }
          childrenB={
            <MDBox position="relative" my={1} pl={3}>
              <CheckboxViewItem
                checked={recordB.meta?.scalping_allowed}
              />
            </MDBox>
          }
        />
      </Grid>
    </>
  );
}

CompareOverview.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareOverview;
