import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function AttrTypography({ children, noIndent }) {
  return (
    <MDTypography
      variant="body2"
      fontWeight="regular"
      lineHeight="1.25"
      position="relative"
      whiteSpace="pre-line"
      my={1}
      pl={noIndent ? 0 : 3}
    >
      {children}
    </MDTypography>
  );
}

AttrTypography.defaultProps = {
  children: null,
  noIndent: false,
};

AttrTypography.propTypes = {
  children: PropTypes.any,
  noIndent: PropTypes.bool,
};

export default AttrTypography;
