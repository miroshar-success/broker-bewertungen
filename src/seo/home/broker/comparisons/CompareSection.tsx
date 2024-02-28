import { Grid, Typography } from '@mui/material';
import { i18n } from '../../../i18n';
import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import React from 'react';

function CompareSection({ children, name, tooltip }) {
  return (
    <Grid xs={12} lg={3} item>
      <Typography
        variant="body1"
        color="warning"
        fontWeight="bold"
        lineHeight="1.25"
        my={{
          lg: 1,
          xs: 0,
        }}
      >
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n(`entities.broker.comparison.${name}`)}
        {Boolean(tooltip) && (
          <Icon color="secondary">help</Icon>
        )}
      </Typography>
    </Grid>
  );
}

CompareSection.defaultProps = {
  children: null,
  name: null,
  tooltip: null,
};

CompareSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  tooltip: PropTypes.any,
};

export default CompareSection;
