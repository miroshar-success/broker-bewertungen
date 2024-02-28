import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

function CheckboxViewItem(props) {
  const label =
    Boolean(props.label) &&
    `${props.prefix ? `${props.prefix} ` : ''}${
      props.label
    }`;

  return (
    <Box display="flex" justifyContent="flex-start">
      <Typography variant="button">
        {props.checked ? '✔' : '✖'}
      </Typography>
      {Boolean(label) && (
        <Typography
          variant="button"
          fontWeight="regular"
          ml={1}
        >
          {label}
        </Typography>
      )}
    </Box>
  );
}

CheckboxViewItem.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  prefix: PropTypes.string,
};

export default CheckboxViewItem;
