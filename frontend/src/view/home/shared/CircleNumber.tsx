import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

import lColors from 'src/mui/assets/theme/base/colors';
import dColors from 'src/mui/assets/theme-dark/base/colors';
import MDBox from 'src/mui/components/MDBox';
import PropTypes from 'prop-types';

function CircleNumber({ children, size }) {
  const { darkMode } = selectMuiSettings();
  const colors = darkMode ? dColors : lColors;

  return (
    <MDBox
      alignItems="center"
      border={`2px solid ${colors.inputBorderColor}`}
      borderRadius={`${size / 2}px`}
      color={colors.inputBorderColor}
      display="flex"
      flexShrink={0}
      fontSize={`${size / 2}px`}
      fontWeight="bold"
      height={`${size}px`}
      justifyContent="center"
      lineHeight={1}
      width={`${size}px`}
    >
      {children}
    </MDBox>
  );
}

CircleNumber.defaultProps = {
  size: 50,
};

CircleNumber.propTypes = {
  children: PropTypes.any,
  size: PropTypes.number,
};

export default CircleNumber;
