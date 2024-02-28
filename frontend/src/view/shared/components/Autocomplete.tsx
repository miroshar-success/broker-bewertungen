import { styled } from '@mui/material';
import lightColors from 'src/mui/assets/theme/base/colors';
import darkColors from 'src/mui/assets/theme-dark/base/colors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

export default styled('div')(({ theme }) => {
  const { palette } = theme;

  const { white } = palette;

  const { sidenavColor, darkMode } = selectMuiSettings();

  const colors = darkMode ? darkColors : lightColors;

  return {
    '& .MuiAutocomplete-tag': {
      backgroundColor: colors[sidenavColor]?.main,
      color: white.main,
    },
  };
});
