import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import BrokerRatingPercent from 'src/view/home/broker/shared/BrokerRatingPercent';
import RatingViewItem from 'src/view/shared/view/RatingViewItem';
import PropTypes from 'prop-types';

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
      <MDBox
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
        gap={1}
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
              alt="star-grey"
              height={size}
            />
          }
          icon={
            <img
              src="/images/star-fill.png"
              alt="star-fill"
              height={size}
            />
          }
          size="large"
        />
      </MDBox>
      {!hideDescription && (
        <MDTypography
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
        </MDTypography>
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
