import { styled } from '@mui/material/styles';

const SocialButtons = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  marginTop: '24px',

  '& img': {
    marginLeft: '16px',
    marginRight: '16px',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
  },
});

export default SocialButtons;
