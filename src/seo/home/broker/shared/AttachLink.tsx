import MaterialLink from '@mui/material/Link';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';

function AttachLink({ link, children }) {
  return Boolean(link) && link.trim() !== '' ? (
    <Typography
      variant="body2"
      fontWeight="regular"
      component="span"
      lineHeight={1}
    >
      <MaterialLink
        href={link}
        target="_blank"
        underline="hover"
      >
        {children}
      </MaterialLink>
    </Typography>
  ) : (
    children
  );
}

AttachLink.defaultProps = {
  link: null,
};

AttachLink.propTypes = {
  link: PropTypes.string,
  children: PropTypes.any,
};

export default AttachLink;
