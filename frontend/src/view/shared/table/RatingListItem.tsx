import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import StyledRating from 'src/view/shared/styles/StyledRating';
import PropTypes from 'prop-types';

function RatingListItem(props) {
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
    size,
    value,
  } = props;
  return (
    <MDBox lineHeight={0}>
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
    </MDBox>
  );
}

RatingListItem.defaultProps = {
  allowHalf: false,
  color: null,
  count: 5,
  defaultValue: 0,
  precision: 0,
  size: 'small',
};

RatingListItem.propTypes = {
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
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default RatingListItem;
