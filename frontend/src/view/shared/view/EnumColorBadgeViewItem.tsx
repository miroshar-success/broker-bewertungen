import PropTypes from 'prop-types';
import { i18n } from 'src/i18n';
import ColorBadge from 'src/view/shared/components/ColorBadge';

function EnumColorBadgeViewItem(props) {
  const { value, enums, colors, i18nPrefix, label } = props;
  const index = enums.indexOf(value);
  const color = index === -1 ? null : colors[index];
  return (
    <ColorBadge
      label={label ?? i18n(`${i18nPrefix}.${value}`)}
      color={color}
    />
  );
}

EnumColorBadgeViewItem.propsType = {
  colors: PropTypes.array.isRequired,
  enums: PropTypes.array.isRequired,
  i18nPrefix: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
};

export default EnumColorBadgeViewItem;
