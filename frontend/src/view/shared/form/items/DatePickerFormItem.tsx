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
import moment from 'moment';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function DatePickerFormItem(props) {
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
    register,
    errors,
    formState: { touched, isSubmitted },
    setValue,
    control: { defaultValuesRef },
    getValues,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || {};

  const formValue = getValues(name);

  const getInitialValue = () =>
    formValue || value || defaultValues[name] || '';

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

  if (forceValue && value) {
    setValue(name, moment(value), {
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
      <DTPicker
        clearable
        disableCloseOnSelect={false}
        inputFormat={format}
        showToolbar={true}
        toolbarTitle={label}
        onAccept={(value) => {
          if (props.onAccept) {
            props.onAccept(value);
            return;
          }
          setCurValue(value);
          setValue(name, moment(value), {
            shouldValidate: false,
            shouldDirty: true,
          });
        }}
        onChange={(value) => {
          props.onChange && props.onChange(value);
        }}
        renderInput={(props) => (
          <MDInput
            {...props}
            id={name}
            name={name}
            label={label}
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
        value={curValue}
      />
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

DatePickerFormItem.defaultProps = {
  required: false,
  forceValue: false,
};

DatePickerFormItem.propTypes = {
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
  value: PropTypes.string,
  variant: PropTypes.string,
};

export default DatePickerFormItem;
