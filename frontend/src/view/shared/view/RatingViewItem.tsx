import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import OutOf from 'src/view/shared/components/OutOf';
import PropTypes from 'prop-types';
import StyledRating from 'src/view/shared/styles/StyledRating';

function RatingViewItem(props) {
  const { darkMode } = selectMuiSettings();
  const {
    allowHalf,
    color,
    count,
    defaultValue,
    emptyIcon,
    hiddenLabel,
    icon,
    label,
    precision,
    showValue,
    size,
    value,
  } = props;
  return (
    <MDBox
      pt={hiddenLabel || !Boolean(label) ? 0 : 2}
      position="relative"
      lineHeight={0}
    >
      {!hiddenLabel && (
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
          defaultValue={defaultValue}
          value={value}
          icon={icon}
          emptyIcon={emptyIcon || icon}
          max={count}
          precision={precision || (allowHalf ? 0.5 : 1)}
          ownerState={{
            color,
          }}
          size={size}
          readOnly
        />
        {showValue && <OutOf value={value} total={count} />}
      </MDBox>
    </MDBox>
  );
}

RatingViewItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  precision: 0,
  showValue: false,
  size: 'medium',
};

RatingViewItem.propTypes = {
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
  emptyIcon: PropTypes.any,
  icon: PropTypes.any,
  label: PropTypes.string,
  precision: PropTypes.number,
  showValue: PropTypes.bool,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default RatingViewItem;
