import { Box } from '@mui/material';
import { i18n } from 'src/i18n';
import ColorBadge from 'src/view/shared/components/ColorBadge';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import PropTypes from 'prop-types';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';

export function generateColorBadgeSelectOptions(
  values,
  colors,
  i18nPrefix,
) {
  if (!values || !Array.isArray(values)) {
    return null;
  }
  return values.map((value, index) => {
    const label = i18nPrefix
      ? i18n(`${i18nPrefix}.${value}`)
      : null;
    const color = Array.isArray(colors)
      ? colors[index]
      : null;
    return {
      value,
      label,
      color,
    };
  });
}

export function colorBadgeSelectFormItemRenderOption(
  props,
  option,
) {
  return (
    <Box component="li" {...props}>
      <ColorBadge
        label={option.label}
        color={option.color}
      />
    </Box>
  );
}

function ColorBadgeSelectFormItem(props) {
  const {
    label,
    margin,
    onChange,
    options,
    required,
    shrink,
    size,
    variant,
  } = props;

  const renderInput = (params) => {
    const option = options.find(
      (option) =>
        option.label === params?.inputProps?.value,
    );
    return (
      <>
        {option && (
          <MDBox
            display="block"
            lineHeight={0}
            position="absolute"
            mt={2.2}
          >
            <ColorBadge
              label={option.label}
              color={option.color}
            />
          </MDBox>
        )}
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
            '& input': {
              padding: `${
                option ? '6px' : '4px'
              } 10px !important`,
              color: option
                ? 'transparent !important'
                : null,
              fontSize: option ? '0.75rem' : null,
              letterSpacing: '1px',
              textTransform: 'uppercase',
              fontWeight: 500,
              borderRadius: '4px',
            },
          }}
        />
      </>
    );
  };

  return (
    <SelectFormItem
      {...props}
      renderOption={colorBadgeSelectFormItemRenderOption}
      renderInput={renderInput}
      onChange={onChange}
    />
  );
}

ColorBadgeSelectFormItem.defaultProps = {
  isClearable: true,
  required: false,
};

ColorBadgeSelectFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  hint: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  variant: PropTypes.string,
};

export default ColorBadgeSelectFormItem;
