import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import MDInput from 'src/mui/components/MDInput';
import { useState } from 'react';

export function customStyledSelectFormItemRenderOption(
  props,
  option,
) {
  return (
    <Box component="li" {...props} sx={option.style ?? {}}>
      {option.label}
    </Box>
  );
}

function CustomStyledSelectFormItem(props) {
  const {
    value,
    options,
    label,
    required,
    size,
    shrink,
    margin,
    variant,
    onChange,
  } = props;

  const [currentValue, setValue] = useState(value);

  const renderInput = (params) => {
    const option = options.find(
      (option) => option.value === currentValue,
    );
    return (
      <MDInput
        {...params}
        required={required}
        margin={margin}
        variant={variant}
        size={size}
        InputLabelProps={{
          shrink: shrink,
        }}
        label={label}
        sx={{
          '& input': option?.style ?? {},
        }}
      />
    );
  };

  const onChangeSelect = (value) => {
    setValue(value);
    onChange && onChange(value);
  };

  return (
    <SelectFormItem
      {...props}
      renderOption={customStyledSelectFormItemRenderOption}
      renderInput={renderInput}
      onChange={onChangeSelect}
    />
  );
}

CustomStyledSelectFormItem.defaultProps = {
  required: false,
  isClearable: true,
};

CustomStyledSelectFormItem.propTypes = {
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  label: PropTypes.string,
  hint: PropTypes.string,
  required: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  mode: PropTypes.string,
  isClearable: PropTypes.bool,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  shrink: PropTypes.bool,
  margin: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default CustomStyledSelectFormItem;
