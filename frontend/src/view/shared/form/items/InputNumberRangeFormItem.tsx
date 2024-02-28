import { i18n } from 'src/i18n';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDInput from 'src/mui/components/MDInput';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function InputNumberRangeFormItem(props) {
  const {
    autoComplete,
    autoFocus,
    disabled,
    endAdornment,
    externalErrorMessage,
    forceValue,
    hint,
    label,
    margin,
    name,
    placeholder,
    required,
    rerender,
    shrink,
    size,
    value,
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
      : value || defaultValues[name] || [];

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue && value) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    register({ name });
  }, [register, name]);

  useEffect(() => {
    if (forceValue) {
      setCurValue(value);
    }
  }, [value]);

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

  const updateCurValue = (newValue) => {
    setValue(name, newValue, {
      shouldValidate: false,
      shouldDirty: true,
    });
    setCurValue(newValue);
    props.onChange && props.onChange(newValue);
  };

  const handleStartChanged = (value) => {
    updateCurValue([value, endValue()]);
  };

  const handleEndChanged = (value) => {
    updateCurValue([startValue(), value]);
  };

  const startValue = () => {
    if (!curValue) {
      return '';
    }

    if (Array.isArray(!curValue)) {
      return '';
    }

    if (!curValue.length) {
      return '';
    }

    return curValue[0];
  };

  const endValue = () => {
    if (!curValue) {
      return '';
    }

    if (Array.isArray(!curValue)) {
      return '';
    }

    if (curValue.length < 2) {
      return '';
    }

    return curValue[1];
  };

  return (
    <>
      <MDBox
        display="flex"
        flexWrap="nowrap"
        alignItems="baseline"
      >
        <MDInput
          fullWidth
          label={`${label} ${i18n('common.start')}`}
          variant={variant}
          size={size}
          margin={margin}
          type="number"
          id={`${name}Start`}
          name={`${name}Start`}
          onChange={(event) =>
            handleStartChanged(event.target.value)
          }
          value={startValue()}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          InputLabelProps={{
            shrink: shrink,
          }}
          error={Boolean(errorMessage)}
          helperText={hint}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
        />

        <MDBox flexShrink={1} mx="6.4px">
          <MDTypography color="secondary">~</MDTypography>
        </MDBox>

        <MDInput
          type="number"
          label={`${label} ${i18n('common.end')}`}
          id={`${name}End`}
          name={`${name}End`}
          required={required}
          margin={margin}
          fullWidth
          variant={variant}
          size={size}
          onChange={(event) =>
            handleEndChanged(event.target.value)
          }
          value={endValue()}
          placeholder={placeholder || undefined}
          autoFocus={autoFocus || undefined}
          autoComplete={autoComplete || undefined}
          InputLabelProps={{
            shrink: shrink,
          }}
          error={Boolean(errorMessage)}
          helperText={hint}
          onBlur={(event) => {
            props.onBlur && props.onBlur(event);
          }}
        />
      </MDBox>
      {errorMessage && (
        <MDBox mt={0.6}>
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

InputNumberRangeFormItem.defaultProps = {
  forceValue: false,
  required: false,
};

InputNumberRangeFormItem.propTypes = {
  autoComplete: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  endAdornment: PropTypes.any,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  formItemProps: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.string,
};

export default InputNumberRangeFormItem;
