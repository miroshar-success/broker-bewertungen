import { styled } from '@mui/material/styles';

const I18nFlagsWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  marginTop: '24px',

  '& img': {
    marginRight: '8px',
    cursor: 'pointer',
  },
});

export default I18nFlagsWrapper;
