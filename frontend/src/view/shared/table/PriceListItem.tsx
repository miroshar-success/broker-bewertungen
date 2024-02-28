import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PropTypes from 'prop-types';
import RatingListItem from 'src/view/shared/table/RatingListItem';

function PriceListItem(props) {
  const { color } = props;

  const { sidenavColor } = selectMuiSettings();

  return (
    <RatingListItem
      {...props}
      color={color || sidenavColor}
    />
  );
}

PriceListItem.defaultProps = {
  color: null,
  count: 4,
  icon: <AttachMoneyIcon />,
  size: 'small',
};

PriceListItem.propTypes = {
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
  label: PropTypes.string,
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  value: PropTypes.number,
};

export default PriceListItem;
