import { i18n } from 'src/i18n';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import FormErrors from 'src/view/shared/form/formErrors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import RatingFormItem from 'src/view/shared/form/items/RatingFormItem';
import { useSelector } from 'react-redux';
import formSelectors from 'src/modules/form/formSelectors';

function RatingRangeFormItem(props) {
  const {
    allowHalf,
    color,
    count,
    defaultValue,
    disabled,
    emptyIcon,
    externalErrorMessage,
    forceValue,
    icon,
    label,
    name,
    precision,
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
      return null;
    }

    if (Array.isArray(!curValue)) {
      return null;
    }

    if (!curValue.length) {
      return null;
    }

    return curValue[0];
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

    return curValue[1];
  };

  return (
    <>
      <MDBox
        display="flex"
        flexWrap="nowrap"
        alignItems="center"
        gap="6.4px"
      >
        <RatingFormItem
          allowHalf={allowHalf}
          color={color}
          count={count}
          defaultValue={defaultValue}
          disabled={disabled}
          emptyIcon={emptyIcon}
          forceValue={true}
          icon={icon}
          label={`${label} ${i18n('common.start')}`}
          name={`${name}Start`}
          onChange={handleStartChanged}
          precision={precision}
          required={required}
          showValue={showValue}
          size={size}
          value={startValue()}
        />

        <MDTypography
          color="secondary"
          mt={2}
          lineHeight={1}
        >
          ~
        </MDTypography>

        <RatingFormItem
          allowHalf={allowHalf}
          color={color}
          count={count}
          defaultValue={defaultValue}
          disabled={disabled}
          emptyIcon={emptyIcon}
          forceValue={true}
          icon={icon}
          label={`${label} ${i18n('common.end')}`}
          name={`${name}End`}
          onChange={handleEndChanged}
          precision={precision}
          required={required}
          showValue={showValue}
          size={size}
          value={endValue()}
        />
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
    </>
  );
}

RatingRangeFormItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  disabled: false,
  forceValue: false,
  precision: 0,
  readOnly: false,
  required: false,
  showValue: false,
  size: 'medium',
};

RatingRangeFormItem.propTypes = {
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

export default RatingRangeFormItem;
