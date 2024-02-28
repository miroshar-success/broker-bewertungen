import { styled } from '@mui/material/styles';
import Tooltip, {
  TooltipProps,
  tooltipClasses,
} from '@mui/material/Tooltip';
import lightColors from 'src/mui/assets/theme/base/colors';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

const HtmlTooltip = styled(
  ({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ),
)(({ theme }) => {
  const { boxShadows } = theme;

  const { darkMode } = selectMuiSettings();

  const colors = darkMode ? darkColors : lightColors;

  return {
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: colors.background.default,
      boxShadow: boxShadows.md,
      width: 'max-content',
      maxWidth: 'max-content',
    },
    [`& .${tooltipClasses.arrow}:before`]: {
      backgroundColor: colors.background.default,
    },
  };
});

export default HtmlTooltip;
