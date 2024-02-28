import { Autocomplete } from '@mui/material';
import { i18n } from 'src/i18n';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import CustomAutocomplete from 'src/view/shared/components/Autocomplete';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function SelectFormItem(props) {
  const {
    externalErrorMessage,
    forceValue,
    hint,
    isClearable,
    label,
    margin,
    mode,
    name,
    options,
    placeholder,
    renderInput,
    renderOption,
    renderTags,
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

  const formValue = getValues(name);

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : defaultValue || defaultValues[name] || [];

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

  const value = () => {
    const { mode } = props;
    if (mode === 'multiple') {
      return valueMultiple(curValue);
    } else {
      return valueOne(curValue);
    }
  };

  const valueMultiple = (values) => {
    if (values) {
      return values.map((value) =>
        options.find((option) => option.value === value),
      );
    }

    return [];
  };

  const valueOne = (value) => {
    const { options } = props;

    if (value != null) {
      return (
        options.find((option) => option.value === value) ||
        null
      );
    }

    return null;
  };

  const handleSelect = (data) => {
    const { mode } = props;
    if (mode === 'multiple') {
      return handleSelectMultiple(data);
    } else {
      return handleSelectOne(data);
    }
  };

  const updateCurValueAndOnChange = (newValue) => {
    setCurValue(newValue);
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    props.onChange && props.onChange(newValue);
  };

  const handleSelectMultiple = (values) => {
    if (!values) {
      updateCurValueAndOnChange([]);
      return;
    }

    const newValue = values
      .map((data) => (data ? data.value : data))
      .filter((value) => value != null);

    updateCurValueAndOnChange(newValue);
  };

  const handleSelectOne = (data) => {
    if (!data) {
      updateCurValueAndOnChange(null);
      return;
    }

    updateCurValueAndOnChange(data.value);
  };

  const defaultRenderInput = (params) => (
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
    />
  );

  return (
    <MDBox position="relative">
      <CustomAutocomplete>
        <Autocomplete
          multiple={mode === 'multiple'}
          isOptionEqualToValue={(option, value) =>
            option.value === value.value
          }
          disablePortal={false}
          value={value()}
          options={options}
          onChange={(event: any, newValue: any) => {
            handleSelect(newValue);
          }}
          renderOption={renderOption}
          renderInput={renderInput ?? defaultRenderInput}
          renderTags={renderTags}
          loadingText={i18n('autocomplete.loading')}
          noOptionsText={i18n('autocomplete.noOptions')}
        />
      </CustomAutocomplete>
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
    </MDBox>
  );
}

SelectFormItem.defaultProps = {
  forceValue: false,
  isClearable: true,
  required: false,
};

SelectFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  isClearable: PropTypes.bool,
  label: PropTypes.string,
  margin: PropTypes.string,
  mode: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  renderInput: PropTypes.func,
  renderOption: PropTypes.func,
  renderTags: PropTypes.func,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.any,
  variant: PropTypes.string,
};

export default SelectFormItem;
