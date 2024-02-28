import AttachLink from './AttachLink';
import Box from '@mui/material/Box';
import ImageView from '../../shared/ImageView';
import PropTypes from 'prop-types';
import React from 'react';

function BrokerImages({
  records,
  attrs: { link, image, alt },
  filterFn,
  renderFn,
  noIndent,
}) {
  return (
    <Box
      display="inline-flex"
      flexWrap="wrap"
      position="relative"
      gap={1}
      my={1}
      pl={noIndent ? 0 : 3}
    >
      {(records || []).filter(filterFn).map((v, idx) => (
        <AttachLink key={idx} link={v[link]}>
          {renderFn ? (
            renderFn(v)
          ) : (
            <ImageView value={v[image]} alt={v[alt]} />
          )}
        </AttachLink>
      ))}
    </Box>
  );
}

BrokerImages.defaultProps = {
  records: [],
  attrs: {
    link: 'url',
    image: 'image',
    alt: 'name',
  },
  filterFn: () => true,
  renderFn: null,
  noIndent: false,
};

BrokerImages.propTypes = {
  records: PropTypes.any,
  filterFn: PropTypes.func,
  attrs: PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.string,
    alt: PropTypes.string,
  }),
  renderFn: PropTypes.func,
  noIndent: PropTypes.bool,
};

export default BrokerImages;
