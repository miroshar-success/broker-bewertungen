import { i18n } from 'src/i18n';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function OutOf({ value, total }) {
  return (
    <MDTypography variant="body2" fontWeight="bold">
      {value}
      <MDTypography
        color="text"
        component="span"
        fontWeight="regular"
        variant="body2"
      >
        {i18n('common.outOf')}
      </MDTypography>
      {total}
    </MDTypography>
  );
}

OutOf.propTypes = {
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default OutOf;
