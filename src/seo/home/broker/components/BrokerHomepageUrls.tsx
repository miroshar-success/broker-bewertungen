import { Grid } from '@mui/material';
import { i18n } from '../../../i18n';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

function BrokerHomepageUrls({ record }) {
  return (
    <>
      <Grid spacing={2} container pt={3}>
        <Grid md={6} xs={12} item>
          <Button
            variant="contained"
            href={record.meta?.homepage}
            target="_blank"
            color="warning"
            fullWidth
          >
            {i18n(
              'entities.broker.text.nowTo',
              record.name,
            )}
          </Button>
        </Grid>
        <Grid md={6} xs={12} item>
          <Button
            variant="contained"
            target="_blank"
            href={record.meta?.demo_url}
            color="info"
            fullWidth
          >
            {i18n('entities.broker.text.freeDemoAccount')}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

BrokerHomepageUrls.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerHomepageUrls;
