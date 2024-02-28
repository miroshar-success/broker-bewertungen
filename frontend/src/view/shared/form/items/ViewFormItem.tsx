import { TextField } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import { useFormContext } from 'react-hook-form';

function ViewFormItem(props) {
  const { label, name } = props;

  const { register } = useFormContext();

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      fullWidth
      inputRef={register}
      margin="normal"
      InputProps={{
        readOnly: true,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      variant="outlined"
      size="small"
    />
  );
}

ViewFormItem.defaultProps = {};

ViewFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

export default ViewFormItem;
