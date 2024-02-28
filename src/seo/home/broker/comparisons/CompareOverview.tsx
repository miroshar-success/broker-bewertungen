import { Box } from '@mui/material';
import { i18n } from '../../../i18n';
import AttrTypography from '../shared/AttrTypography';
import BrokerAttrs from '../shared/BrokerAttrs';
import BrokerLinks from '../shared/BrokerLinks';
import BrokerUpsides from '../shared/BrokerUpsides';
import CheckboxViewItem from '../../shared/CheckboxViewItem';
import CompareDetail from './CompareDetail';
import CompareSection from './CompareSection';
import Grid from '@mui/material/Grid';
import ImageView from '../../shared/ImageView';
import MaterialLink from '@mui/material/Link';
import OverallRating from '../shared/OverallRating';
import PropTypes from 'prop-types';
import React from 'react';

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
            <Box position="relative" my={1} pl={3}>
              <CheckboxViewItem
                checked={recordA.meta?.scalping_allowed}
              />
            </Box>
          }
          childrenB={
            <Box position="relative" my={1} pl={3}>
              <CheckboxViewItem
                checked={recordB.meta?.scalping_allowed}
              />
            </Box>
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
