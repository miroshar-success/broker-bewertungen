import Box from '@mui/material/Box';
import OutOf from './OutOf';
import PropTypes from 'prop-types';
import React from 'react';
import StyledRating from './StyledRating';
import Typography from '@mui/material/Typography';

function RatingViewItem(props) {
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
    <Box
      pt={hiddenLabel || !Boolean(label) ? 0 : 2}
      position="relative"
      lineHeight={0}
    >
      {!hiddenLabel && (
        <Typography
          variant="caption"
          fontWeight="regular"
          lineHeight={1}
          position="absolute"
          top="0"
        >
          {label}
        </Typography>
      )}
      <Box display="flex" alignItems="center" gap={1}>
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
      </Box>
    </Box>
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
