import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';

function AttrTypography({ children, noIndent }) {
  return (
    <Typography
      variant="body2"
      fontWeight="regular"
      lineHeight="1.25"
      position="relative"
      my={1}
      pl={noIndent ? 0 : 3}
    >
      {children}
    </Typography>
  );
}

AttrTypography.defaultProps = {
  children: null,
  noIndent: false,
};

AttrTypography.propTypes = {
  children: PropTypes.any,
  noIndent: PropTypes.bool,
};

export default AttrTypography;
