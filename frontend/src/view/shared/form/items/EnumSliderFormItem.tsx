import PropTypes from 'prop-types';
import { i18n } from 'src/i18n';
import SliderFormItem, {
  generateSliderMarks,
} from 'src/view/shared/form/items/SliderFormItem';

function EnumSliderFormItem(props) {
  const {
    colors,
    enums,
    i18nPrefix,
    label,
    name,
    onChange,
    renderValue,
    track,
    value,
  } = props;

  const fnRenderValue = renderValue
    ? (value) =>
        renderValue({
          value,
          enums,
          colors,
          i18nPrefix,
        })
    : undefined;
  return (
    <SliderFormItem
      name={name}
      label={label}
      track={track}
      min={0}
      max={enums.length ? enums.length - 1 : 0}
      step={1}
      value={enums.indexOf(value)}
      valuetext={(value: number) => {
        return i18nPrefix
          ? i18n(`${i18nPrefix}.${enums[value]}`)
          : enums[value];
      }}
      renderValue={fnRenderValue}
      marks={generateSliderMarks(enums, i18nPrefix, colors)}
      onChange={onChange}
    />
  );
}

EnumSliderFormItem.propTypes = {
  track: PropTypes.any,
  colors: PropTypes.array,
  enums: PropTypes.array.isRequired,
  i18nPrefix: PropTypes.string,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  renderValue: PropTypes.func,
  value: PropTypes.any,
};

export default EnumSliderFormItem;
