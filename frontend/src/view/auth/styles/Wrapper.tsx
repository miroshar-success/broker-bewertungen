import { styled } from '@mui/material/styles';

const Wrapper = styled('div')({
  width: '100%',
  minHeight: '100vh',
  height: '100vh',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  position: 'relative',
  backgroundSize: 'cover',

  '&::before': {
    content: '""',
    width: '100%',
    height: '100%',
    display: 'flex',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    zIndex: '1',
    top: '0',
  },
} as any);

export default Wrapper;
