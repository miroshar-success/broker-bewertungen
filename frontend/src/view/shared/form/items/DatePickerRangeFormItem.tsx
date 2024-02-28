import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDInput from 'src/mui/components/MDInput';
import PropTypes from 'prop-types';
import {
  DEFAULT_PICKER_FORMAT,
  DEFAULT_PICKER_FORMAT_DATE_ONLY,
} from 'src/config/common';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { i18n } from 'src/i18n';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function DatePickerRangeFormItem(props) {
  const {
    autoComplete,
    autoFocus,
    externalErrorMessage,
    forceValue,
    hint,
    label,
    margin,
    name,
    placeholder,
    required,
    rerender,
    showTime,
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
  };

  const handleStartChanged = (value) => {
    const newValue = [value, endValue()];
    if (props.onAccept) {
      props.onAccept(newValue);
      return;
    }
    updateCurValue(newValue);
  };

  const handleEndChanged = (value) => {
    const newValue = [startValue(), value];
    if (props.onAccept) {
      props.onAccept(newValue);
      return;
    }
    updateCurValue(newValue);
  };

  const startValue = () => {
    if (!curValue) {
      return null;
    }

    if (Array.isArray(!curValue)) {
      return null;
    }

    if (!curValue.length) {
      return null;
    }

    return curValue[0] || null;
  };

  const endValue = () => {
    if (!curValue) {
      return null;
    }

    if (Array.isArray(!curValue)) {
      return null;
    }

    if (curValue.length < 2) {
      return null;
    }

    return curValue[1] || null;
  };

  const DTPicker = (props) => {
    return (
      <>
        {showTime ? (
          <MobileDateTimePicker {...props} />
        ) : (
          <MobileDatePicker {...props} />
        )}
      </>
    );
  };

  const format = showTime
    ? DEFAULT_PICKER_FORMAT
    : DEFAULT_PICKER_FORMAT_DATE_ONLY;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MDBox
        display="flex"
        flexWrap="nowrap"
        alignItems="baseline"
      >
        <DTPicker
          clearable
          disableCloseOnSelect={false}
          renderInput={(props) => (
            <MDInput
              {...props}
              id={`${name}Start`}
              name={`${name}Start`}
              label={`${label} ${i18n('common.start')}`}
              onBlur={(event) => {
                props.onBlur && props.onBlur(event);
              }}
              margin={margin}
              fullWidth
              variant={variant}
              size={size}
              placeholder={placeholder || undefined}
              autoFocus={autoFocus || undefined}
              autoComplete={autoComplete || undefined}
              InputLabelProps={{
                shrink: shrink,
              }}
              required={required}
              error={Boolean(errorMessage)}
            />
          )}
          showToolbar={true}
          toolbarTitle={`${label} ${i18n('common.start')}`}
          onAccept={(value) => handleStartChanged(value)}
          onChange={(value) =>
            props.onChange &&
            props.onChange([value, endValue()])
          }
          value={startValue()}
          inputFormat={format}
        />

        <MDBox flexShrink={1} mx="6.4px">
          <MDTypography color="secondary">~</MDTypography>
        </MDBox>

        <DTPicker
          clearable
          disableCloseOnSelect={false}
          renderInput={(props) => (
            <MDInput
              {...props}
              id={`${name}End`}
              name={`${name}End`}
              label={`${label} ${i18n('common.end')}`}
              onBlur={(event) => {
                props.onBlur && props.onBlur(event);
              }}
              margin={margin}
              fullWidth
              variant={variant}
              size={size}
              placeholder={placeholder || undefined}
              autoFocus={autoFocus || undefined}
              autoComplete={autoComplete || undefined}
              InputLabelProps={{
                shrink: shrink,
              }}
              required={required}
              error={Boolean(errorMessage)}
            />
          )}
          showToolbar={true}
          toolbarTitle={`${label} ${i18n('common.end')}`}
          onAccept={(value) => handleEndChanged(value)}
          onChange={(value) =>
            props.onChange &&
            props.onChange([startValue(), value])
          }
          value={endValue()}
          inputFormat={format}
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
    </LocalizationProvider>
  );
}

DatePickerRangeFormItem.defaultProps = {
  forceValue: false,
  required: false,
};

DatePickerRangeFormItem.propTypes = {
  autoFocus: PropTypes.bool,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  formItemProps: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  margin: PropTypes.string,
  name: PropTypes.string.isRequired,
  onAccept: PropTypes.func,
  placeholder: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  showTime: PropTypes.bool,
  shrink: PropTypes.bool,
  size: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.string),
  variant: PropTypes.string,
};

export default DatePickerRangeFormItem;
