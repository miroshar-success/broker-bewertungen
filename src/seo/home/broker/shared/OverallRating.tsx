import { i18n } from '../../../i18n';
import Box from '@mui/material/Box';
import BrokerRatingPercent from './BrokerRatingPercent';
import PropTypes from 'prop-types';
import RatingViewItem from '../../shared/RatingViewItem';
import React from 'react';
import Typography from '@mui/material/Typography';

function OverallRating({
  record,
  hideDescription,
  hidePercent,
  size,
  gap,
  compare,
}) {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexWrap="wrap"
        flexGrow={1}
        justifyContent={
          compare
            ? 'center'
            : {
                xs: 'space-between',
                lg: 'flex-end',
              }
        }
        gap={gap}
      >
        {!hidePercent && (
          <BrokerRatingPercent
            value={record.rating?.overall_rating}
            size={size}
          />
        )}
        <RatingViewItem
          value={record.rating?.overall_rating}
          precision={0.1}
          emptyIcon={
            <img
              src="/images/star-grey.png"
              alt="star-grey-changed"
              width="36"
              height="32"
              style={{height: size}}
            />
          }
          icon={
            <img
              src="/images/star-fill.png"
              alt="star-fill"
              width="36"
              height="32"
              style={{height: size}}
            />
          }
          size="large"
        />
      </Box>
      {!hideDescription && (
        <Typography
          variant="body2"
          fontSize={size * 0.375}
          color="text"
          fontWeight="regular"
          flexGrow={1}
          lineHeight={1}
          textAlign={
            compare
              ? 'center'
              : {
                  xs: 'center',
                  lg: 'right',
                }
          }
          mt={gap}
        >
          {i18n(
            'entities.broker.text.rating',
            record.rating?.overall_rating?.toFixed(2) ?? 0,
            5,
            record.rating?.overall_reviews ?? 0,
          )}
        </Typography>
      )}
    </>
  );
}

OverallRating.defaultProps = {
  hideDescription: false,
  hidePercent: false,
  size: 32,
  gap: 0,
  compare: false,
};

OverallRating.propTypes = {
  record: PropTypes.any.isRequired,
  hideDescription: PropTypes.bool,
  hidePercent: PropTypes.bool,
  size: PropTypes.number,
  gap: PropTypes.number,
  compare: PropTypes.bool,
};

export default OverallRating;
