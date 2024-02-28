import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';
import { i18n } from '../../i18n';

function OutOf({ value, total }) {
  return (
    <Typography variant="body2" fontWeight="bold">
      {value}
      <Typography
        color="text"
        component="span"
        fontWeight="regular"
        variant="body2"
      >
        {i18n('common.outOf')}
      </Typography>
      {total}
    </Typography>
  );
}

OutOf.propTypes = {
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default OutOf;
