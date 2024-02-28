import Box from '@mui/material/Box';
import BrokerAttrs from './BrokerAttrs';
import PropTypes from 'prop-types';
import React from 'react';

function BrokerCheckbox({ record, field }) {
  const checkField = field.toLowerCase();
  const textField = `text_${checkField}`;
  if (
    !record.checkbox ||
    !record.checkbox[checkField] ||
    !record.checkbox[textField]
  ) {
    return null;
  }
  return (
    <Box lineHeight={0} position="relative" fontSize="20px">
      <Box position="relative" my={1} pl={3}>
        <BrokerAttrs
          records={record.checkbox[textField]}
          attrs={{ link: 'url', title: 'text' }}
          noIndent
        />
      </Box>
    </Box>
  );
}

BrokerCheckbox.propTypes = {
  record: PropTypes.any.isRequired,
  field: PropTypes.string.isRequired,
};

export default BrokerCheckbox;
