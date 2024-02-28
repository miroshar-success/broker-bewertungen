import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@mui/material/Typography';

function BrokerUpsides({ record }) {
  return (
    <Box lineHeight={0} position="relative" fontSize="20px">
      {(record.upsides || []).map((upside) => (
        <Box
          key={upside.id}
          position="relative"
          my={1}
          pl={3}
        >
          <Typography
            variant="body2"
            fontWeight="regular"
            lineHeight="1.25"
          >
            {upside.text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

BrokerUpsides.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerUpsides;
