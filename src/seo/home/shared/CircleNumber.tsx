import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';

function CircleNumber({ children, size }) {
  return (
    <Box
      alignItems="center"
      borderRadius={`${size / 2}px`}
      display="flex"
      flexShrink={0}
      fontSize={`${size / 2}px`}
      fontWeight="bold"
      height={`${size}px`}
      justifyContent="center"
      lineHeight={1}
      width={`${size}px`}
    >
      {children}
    </Box>
  );
}

CircleNumber.defaultProps = {
  size: 50,
};

CircleNumber.propTypes = {
  children: PropTypes.any,
  size: PropTypes.number,
};

export default CircleNumber;
