import { Rating, styled, Theme } from '@mui/material';

const StyledRating = styled(Rating)(
  ({
    theme,
    ownerState,
  }: {
    theme?: Theme;
    ownerState: {
      color:
        | null
        | 'primary'
        | 'secondary'
        | 'info'
        | 'success'
        | 'warning'
        | 'error';
    };
  }) => {
    const color = theme.palette[ownerState.color]?.main;
    if (!color) {
      return {};
    }
    return {
      '& .MuiRating-iconFilled, .MuiRating-iconHover': {
        color: color,
      },
    };
  },
);

export default StyledRating;
