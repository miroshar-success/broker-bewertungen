import { i18n } from '../../../i18n';
import Grid from '@mui/material/Grid';
import Icon from '@mui/material/Icon';
import PropTypes from 'prop-types';
import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

function BrokerSection({ children, name, tooltip }) {
  return (
    <Grid md={4} xs={12} item>
      <Typography
        variant="h5"
        color="text"
        lineHeight="1.25"
        my={1}
      >
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n(`entities.broker.comparison.${name}`)}
        {Boolean(tooltip) && (
          <Tooltip
            title={
              typeof tooltip === 'string'
                ? i18n(
                    `entities.broker.comparison.${tooltip}`,
                  )
                : tooltip
            }
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        )}
      </Typography>
    </Grid>
  );
}

BrokerSection.defaultProps = {
  children: null,
  name: null,
  tooltip: null,
};

BrokerSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  tooltip: PropTypes.any,
};

export default BrokerSection;
