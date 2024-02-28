import darkColors from 'src/mui/assets/theme-dark/base/colors';
import lightColors from 'src/mui/assets/theme/base/colors';
import rgba from 'src/mui/assets/theme/functions/rgba';

const printScrollbarColorStyles = (darkMode = true) => {
  const themeColors = [
    'primary',
    'secondary',
    'info',
    'success',
    'warning',
    'error',
  ];

  const colors = darkMode ? darkColors : lightColors;

  for (const themeColor of themeColors) {
    const pickedColor = colors[themeColor].main;
    const thumbColor = rgba(pickedColor, 0.8);
    const backgroundColor = rgba(pickedColor, 0.2);
    console.log(`
      /* ${themeColor} scrollbar */
      .${themeColor}-scrollbar * {
        scrollbar-color: ${thumbColor} transparent !important;
      }

      .${themeColor}-scrollbar *::-webkit-scrollbar-track {
        background: ${backgroundColor} !important;
      }

      .${themeColor}-scrollbar *::-webkit-scrollbar-thumb {
        background-color: ${thumbColor} !important;
      }
    `);
  }
};

export default printScrollbarColorStyles;
