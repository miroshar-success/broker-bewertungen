import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import FormErrors from 'src/view/shared/form/formErrors';
import {
  FormControlLabel,
  FormHelperText,
  Switch,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function SwitchFormItem(props) {
  const { sidenavColor } = selectMuiSettings();

  const {
    externalErrorMessage,
    forceValue,
    hint,
    label,
    name,
    required,
    rerender,
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

  const getInitialValue = () => {
    if (formValue !== undefined && formValue !== null) {
      return formValue;
    }
    if (value !== undefined && value !== null) {
      return value;
    }
    if (
      defaultValues[name] !== undefined &&
      defaultValues[name] !== null
    ) {
      return defaultValues[name];
    }
    return false;
  };

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );

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
    <>
      <FormControlLabel
        control={
          <Switch
            id={name}
            name={name}
            checked={curValue}
            onChange={(e) => {
              setValue(name, Boolean(e.target.checked), {
                shouldValidate: false,
                shouldDirty: true,
              });
              setCurValue(Boolean(e.target.checked));
              props.onChange &&
                props.onChange(e.target.checked);
            }}
            onBlur={() =>
              props.onBlur && props.onBlur(null)
            }
            // inputRef={register}
            color={sidenavColor}
          />
        }
        label={label}
      />
      {formHelperText && (
        <FormHelperText style={{ marginTop: 0 }}>
          {formHelperText}
        </FormHelperText>
      )}
    </>
  );
}

SwitchFormItem.defaultProps = {
  forceValue: false,
};

SwitchFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hint: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  value: PropTypes.bool,
};

export default SwitchFormItem;
