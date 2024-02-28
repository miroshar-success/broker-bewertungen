import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Slider, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import colors from 'src/mui/assets/theme/base/colors';
import FormErrors from 'src/view/shared/form/formErrors';
import formSelectors from 'src/modules/form/formSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export function generateSliderMarks(
  values,
  i18nPrefix = null,
  colors = null,
) {
  if (!values || !Array.isArray(values)) {
    return null;
  }
  return values.map((value, index) => {
    const title = i18nPrefix
      ? i18n(`${i18nPrefix}.${value}`)
      : null;
    const color = Array.isArray(colors)
      ? colors[index]
      : null;
    return {
      value: index,
      key: value,
      title,
      color,
    };
  });
}

const CustomColorSlider = styled(Slider)(
  ({ marks, value, color }) => {
    const newColor =
      marks[Number(value)]?.color ?? colors[color].main;
    return {
      color: newColor,
      '& .MuiSlider-thumb': {
        backgroundColor: colors.white.main,
        border: `1px solid ${newColor}`,
      },
    };
  },
);

function SliderFormItem(props) {
  const {
    defaultValue,
    externalErrorMessage,
    label,
    marks,
    name,
    renderValue,
    step,
    value: originalValue,
    valuetext,
    ...rest
  } = props;

  const toValue = (value) => {
    return (
      (marks || []).find(({ key }) => key === value)
        ?.value ?? value
    );
  };

  const safeValue = (value) => {
    return (marks && marks[value]?.key) ?? value;
  };

  const safeTitle = (value) => {
    return (
      (marks &&
        (marks[value]?.title ?? marks[value]?.key)) ??
      value
    );
  };

  const refresh = useSelector(formSelectors.selectRefresh);

  const {
    control: { defaultValuesRef },
    errors,
    formState: { touched, isSubmitted },
    getValues,
    register,
    setValue,
  } = useFormContext();

  const defaultValues = defaultValuesRef.current || 0;

  const formValue = name ? toValue(getValues(name)) : 0;

  const getInitialValue = () =>
    ![null, undefined].includes(formValue)
      ? formValue
      : originalValue || toValue(defaultValues[name]) || 0;

  const { sidenavColor } = selectMuiSettings();

  const [sliderValue, setSliderValue] = useState(
    getInitialValue(),
  );

  const onChange = (
    event: Event,
    newValue: number | number[],
  ) => {
    if (typeof newValue === 'number') {
      setSliderValue(newValue);
      setValue(name, safeValue(newValue), {
        shouldValidate: false,
        shouldDirty: true,
      });
      props.onChange && props.onChange(safeValue(newValue));
    }
  };

  useEffect(() => {
    if (name) {
      register({ name });
    }
  }, [register, name]);

  useEffect(() => {
    onChange(null, getInitialValue());
  }, [refresh]);

  const errorMessage = FormErrors.errorMessage(
    name,
    errors,
    touched,
    isSubmitted,
    externalErrorMessage,
  );

  return (
    <MDBox pt={1} position="relative">
      <MDBox
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
      >
        <MDTypography
          variant="button"
          fontWeight="regular"
          color="text"
          mr={1}
        >
          {`${label}:`}
        </MDTypography>
        {renderValue ? (
          renderValue(safeValue(sliderValue))
        ) : (
          <MDTypography
            variant="button"
            fontWeight="regular"
          >
            {safeTitle(sliderValue)}
          </MDTypography>
        )}
      </MDBox>
      <CustomColorSlider
        defaultValue={defaultValue}
        getAriaValueText={valuetext}
        color={sidenavColor}
        step={step}
        valueLabelDisplay="off"
        {...rest}
        value={sliderValue}
        onChange={onChange}
        marks={marks}
      />
      {errorMessage && (
        <MDBox>
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

SliderFormItem.propTypes = {
  externalErrorMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  marks: PropTypes.array,
  max: PropTypes.number,
  min: PropTypes.number,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
  step: PropTypes.number,
  track: PropTypes.any,
  value: PropTypes.number,
  valuetext: PropTypes.func,
};

export default SliderFormItem;
