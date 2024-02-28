import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import ClearSharpIcon from '@mui/icons-material/ClearSharp';
import Color from 'color';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import lightColors from 'src/mui/assets/theme/base/colors';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

export function getColorBadgeFore(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('black'), 0.3).hex();
}

export function getColorBadgeBack(color) {
  if (!color) {
    return null;
  }
  return Color(color).mix(Color('white'), 0.75).hex();
}

function ColorBadge(props) {
  const { sidenavColor, darkMode } = selectMuiSettings();
  const { color, label, onDelete } = props;
  const defaultColor = darkMode
    ? darkColors[sidenavColor]?.main
    : lightColors[sidenavColor]?.main;
  const backColor = getColorBadgeBack(
    color || defaultColor,
  );
  const foreColor = getColorBadgeFore(
    color || defaultColor,
  );
  return (
    <MDBox
      display="inline-block"
      lineHeight={0}
      color={foreColor}
    >
      <MDTypography
        alignItems="center"
        backgroundColor={backColor}
        borderRadius={1}
        color="inherit"
        display="flex"
        flexWrap="nowrap"
        fontWeight="bold"
        gap={0.5}
        letterSpacing={1}
        lineHeight={1}
        m={0}
        px={1}
        py={0.875}
        textTransform="uppercase"
        variant="caption"
        whiteSpace="nowrap"
      >
        {label}
        {Boolean(onDelete) && (
          <MDBox
            bgColor={foreColor}
            borderRadius="100%"
            color={backColor}
            height={1}
            lineHeight={0}
            onClick={onDelete}
            width={1}
            sx={{
              cursor: 'pointer',
            }}
          >
            <ClearSharpIcon />
          </MDBox>
        )}
      </MDTypography>
    </MDBox>
  );
}

ColorBadge.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string.isRequired,
  onDelete: PropTypes.func,
};

export default ColorBadge;
