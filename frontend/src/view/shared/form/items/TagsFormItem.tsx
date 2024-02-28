import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'src/i18n';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import {
  Autocomplete,
  createFilterOptions,
} from '@mui/material';
import MDInput from 'src/mui/components/MDInput';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

interface Option {
  value: string;
  label: string;
}

const filter = createFilterOptions<Option>();

function TagsFormItem(props) {
  const {
    externalErrorMessage,
    forceValue,
    hint,
    isClearable,
    label,
    margin,
    name,
    notFoundContent = i18n('autocomplete.noOptions'),
    placeholder,
    required,
    rerender,
    shrink,
    size,
    value: defaultValue,
    variant,
  } = props;

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const originalValue = defaultValues[name];

  const formValue = getValues(name);

  const getInitialValue = () =>
    formValue || defaultValue || originalValue || [];

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue) {
    setValue(name, defaultValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setCurValue(defaultValue);
    }
  }, [defaultValue]);

  const refresh = useSelector(formSelectors.selectRefresh);

  useEffect(() => {
    setCurValue(getInitialValue());
  }, [rerender, refresh]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  const updateCurValueAndOnChange = (newValue) => {
    setCurValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleChange = (data) => {
    if (!data || !data.length) {
      updateCurValueAndOnChange(null);
      return;
    }

    const commaSplittedValues = data
      .map((item) => item.value)
      .join(',')
      .split(',');

    updateCurValueAndOnChange(commaSplittedValues);
  };

  const value = () => {
    if (!curValue || !curValue.length) {
      return [];
    }

    return curValue.map((item) => ({
      value: item,
      label: item,
    }));
  };

  const [options, setOptions] = useState<Array<Option>>(
    value(),
  );

  return (
    <>
      <Autocomplete
        multiple
        isOptionEqualToValue={(option, value) =>
          option.value === value.value
        }
        value={value()}
        options={options}
        selectOnFocus
        clearOnBlur
        onChange={(event: any, newValue: any) => {
          handleChange(newValue);
          setOptions(newValue);
        }}
        renderInput={(params) => (
          <MDInput
            {...params}
            margin={margin}
            variant={variant}
            size={size}
            required={required}
            InputLabelProps={{
              shrink: shrink,
            }}
            label={label}
          />
        )}
        filterOptions={(options, params) => {
          const filtered = filter(options, params).map(
            (option) => ({
              value: option.value,
              label: option.value,
            }),
          );

          const { inputValue } = params;

          inputValue
            .split(/[ ]*,[ ]*/g)
            .forEach((value) => {
              if (
                value.trim() === '' ||
                filtered.some(
                  (option) => option.value === value,
                )
              ) {
                return;
              }
              filtered.push({
                value: value,
                label: `Add "${value}"`,
              });
            });

          return filtered;
        }}
        loadingText={i18n('autocomplete.loading')}
        noOptionsText={notFoundContent}
      />
      {errorMessage && (
        <MDBox mt={0.75}>
          <MDTypography
            component="div"
            variant="caption"
            color="error"
            fontWeight="regular"
          >
            {errorMessage}
          </MDTypography>
        </MDBox>
      )}
    </>
  );
}

TagsFormItem.defaultProps = {
  forceValue: false,
  isClearable: true,
  required: false,
};

TagsFormItem.propTypes = {
  errorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  notFoundContent: PropTypes.string,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.any,
  variant: PropTypes.string,
};

export default TagsFormItem;
