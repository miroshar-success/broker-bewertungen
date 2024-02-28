import Grid from '@mui/material/Grid';
import LazyLoad from 'react-lazy-load';
import PropTypes from 'prop-types';

function CompareDetail({
  after,
  before,
  childrenA,
  childrenB,
}) {
  return (
    <Grid xs={12} lg={9} item>
      {/* <LazyLoad> */}
      <Grid spacing={2} container>
        {Boolean(before) && (
          <Grid xs={12} item>
            {before}
          </Grid>
        )}
        <Grid xs={6} item>
          {childrenA}
        </Grid>
        <Grid xs={6} item>
          {childrenB}
        </Grid>
        {Boolean(after) && (
          <Grid xs={12} item>
            {after}
          </Grid>
        )}
      </Grid>
      {/* </LazyLoad> */}
    </Grid>
  );
}

CompareDetail.defaultProps = {
  after: null,
  before: null,
};

CompareDetail.propTypes = {
  after: PropTypes.any,
  before: PropTypes.any,
  childrenA: PropTypes.any.isRequired,
  childrenB: PropTypes.any.isRequired,
};

export default CompareDetail;
