import { Box } from '@mui/material';
import { removeAllIframeTags } from '../../../utils';
import BrokerAddress from '../shared/BrokerAddress';
import BrokerContact from '../shared/BrokerContact';
import CompareDetail from './CompareDetail';
import CompareRegion from './CompareRegion';
import CompareSection from './CompareSection';
import Grid from '@mui/material/Grid';
import HtmlView from '../../shared/HtmlView';
import PropTypes from 'prop-types';
import React from 'react';

function CompareProfile({ recordA, recordB }) {
  return (
    <>
      <CompareRegion name="region.profileAndContact" />
      <Grid spacing={2} container>
        <CompareSection name="profile" />
        <CompareDetail
          childrenA={
            <Box position="relative" my={1} pl={3}>
              <HtmlView
                value={removeAllIframeTags(
                  recordA.meta?.teaser,
                )}
              />
            </Box>
          }
          childrenB={
            <Box position="relative" my={1} pl={3}>
              <HtmlView
                value={removeAllIframeTags(
                  recordB.meta?.teaser,
                )}
              />
            </Box>
          }
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="address" />
        <CompareDetail
          childrenA={<BrokerAddress record={recordA} />}
          childrenB={<BrokerAddress record={recordB} />}
        />
      </Grid>
      <Grid spacing={2} container>
        <CompareSection name="contact" />
        <CompareDetail
          childrenA={<BrokerContact record={recordA} />}
          childrenB={<BrokerContact record={recordB} />}
        />
      </Grid>
    </>
  );
}

CompareProfile.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareProfile;
