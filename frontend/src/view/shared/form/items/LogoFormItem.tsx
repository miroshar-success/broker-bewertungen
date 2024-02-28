import { FormControl, FormHelperText } from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import ImagesUploader from 'src/view/shared/uploaders/ImagesUploader';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function LogoFormItem(props) {
  const { darkMode } = selectMuiSettings();

  const {
    externalErrorMessage,
    forceValue,
    hint,
    label,
    max,
    name,
    required,
    rerender,
    storage,
    value,
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

  if (forceValue) {
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

  const formHelperText = errorMessage || hint;

  return (
    <FormControl
      fullWidth
      required={required}
      error={Boolean(errorMessage)}
      component="fieldset"
      size="small"
    >
      {Boolean(label) && (
        <MDTypography
          variant="caption"
          fontWeight="regular"
          color={darkMode ? 'text' : 'secondary'}
        >
          {label}
        </MDTypography>
      )}

      <ImagesUploader
        storage={storage}
        value={curValue}
        onChange={(newValue) => {
          setCurValue(newValue);
          setValue(name, newValue, {
            shouldValidate: false,
            shouldDirty: true,
          });
          props.onChange && props.onChange(newValue);
        }}
        max={max}
      />

      {formHelperText && (
        <FormHelperText sx={{ fontWeight: 400, margin: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </FormControl>
  );
}

LogoFormItem.defaultProps = {
  forceValue: false,
  max: 1,
  required: false,
};

LogoFormItem.propTypes = {
  forceValue: PropTypes.bool,
  formItemProps: PropTypes.object,
  hint: PropTypes.string,
  label: PropTypes.string,
  max: PropTypes.number,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  storage: PropTypes.object.isRequired,
  value: PropTypes.array,
};

export default LogoFormItem;
