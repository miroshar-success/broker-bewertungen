import { i18n } from '../../../i18n';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import PropTypes from 'prop-types';
import React from 'react';

function CompareRegion({ children, name }) {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <Typography
          variant="h3"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {Boolean(children) && children}
          {!children &&
            Boolean(name) &&
            i18n(`entities.broker.comparison.${name}`)}
        </Typography>
      </Grid>
    </Grid>
  );
}

CompareRegion.defaultProps = {
  children: null,
  name: null,
};

CompareRegion.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

export default CompareRegion;
