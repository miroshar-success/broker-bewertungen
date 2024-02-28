import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import StyledRating from 'src/view/shared/styles/StyledRating';
import { i18n } from 'src/i18n';
import OutOf from 'src/view/shared/components/OutOf';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

export function RatingFormItem(props) {
  const { darkMode } = selectMuiSettings();
  const {
    allowHalf,
    color,
    count,
    defaultValue,
    disabled,
    emptyIcon,
    externalErrorMessage,
    forceValue,
    hideLabel,
    icon,
    label,
    name,
    precision,
    readOnly,
    required,
    rerender,
    showValue,
    size,
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

  const formValue = name ? getValues(name) : null;

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : value || defaultValues[name] || 0;

  const [curValue, setCurValue] = useState(
    getInitialValue(),
  );
  const [hover, setHover] = useState(-1);

  if (forceValue && name) {
    setValue(name, value, {
      shouldValidate: false,
      shouldDirty: true,
    });
  }

  useEffect(() => {
    if (name) {
      register({ name });
    }
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

  return (
    <MDBox
      pt={!hideLabel && Boolean(label) ? 2 : 0}
      position="relative"
      lineHeight={0}
    >
      {!hideLabel && Boolean(label) && (
        <MDTypography
          variant="caption"
          color={darkMode ? 'text' : 'secondary'}
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {label}
        </MDTypography>
      )}
      <MDBox display="flex" alignItems="center" gap={1}>
        <StyledRating
          name={name}
          defaultValue={defaultValue}
          value={curValue}
          icon={icon}
          emptyIcon={emptyIcon || icon}
          max={count}
          precision={precision || (allowHalf ? 0.5 : 1)}
          onChange={(evt, newVal) => {
            if (!forceValue) {
              setValue(name, newVal, {
                shouldValidate: false,
                shouldDirty: true,
              });
            }
            setCurValue(newVal);
            props.onChange && props.onChange(newVal);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          ownerState={{
            color,
          }}
          disabled={disabled}
          readOnly={readOnly}
          size={size}
        />
        {showValue && (
          <OutOf
            value={hover !== -1 ? hover : curValue}
            total={count}
          />
        )}
      </MDBox>
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

RatingFormItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  disabled: false,
  forceValue: false,
  hideLabel: false,
  precision: 0,
  readOnly: false,
  required: false,
  showValue: false,
  size: 'medium',
};

RatingFormItem.propTypes = {
  allowHalf: PropTypes.bool,
  color: PropTypes.oneOf([
    null,
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ]),
  count: PropTypes.number,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  emptyIcon: PropTypes.any,
  externalErrorMessage: PropTypes.string,
  forceValue: PropTypes.bool,
  hideLabel: PropTypes.bool,
  icon: PropTypes.any,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  precision: PropTypes.number,
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
  rerender: PropTypes.number,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default RatingFormItem;
