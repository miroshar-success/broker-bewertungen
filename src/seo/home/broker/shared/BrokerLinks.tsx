import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import React from 'react';

function BrokerLinks({ record }) {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <Button
        variant="contained"
        href={record.meta?.demo_url}
        color="success"
        target="_blank"
        fullWidth
      >
        Demo-Konto
      </Button>
      <Button
        variant="contained"
        href={record.meta?.homepage}
        color="warning"
        target="_blank"
        fullWidth
      >
        Zum Broker
      </Button>
    </Box>
  );
}

BrokerLinks.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerLinks;
