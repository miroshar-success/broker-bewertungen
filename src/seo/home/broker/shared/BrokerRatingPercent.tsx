import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';

function BrokerRatingPercent({ value, size }) {
  const percent = Number(((value / 5) * 100).toFixed(0));
  return (
    <Box
      display="flex"
      color="white"
      fontSize={(size * 2) / 3}
      borderRadius="md"
      alignItems="center"
      fontWeight="bold"
      height={size}
      gap={1}
      px={1}
    >
      {`${percent}%`}
    </Box>
  );
}

BrokerRatingPercent.defaultProps = {
  value: 0,
  size: 32,
};

BrokerRatingPercent.propTypes = {
  value: PropTypes.number,
  size: PropTypes.number,
};

export default BrokerRatingPercent;
