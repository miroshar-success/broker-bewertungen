import { styled } from '@mui/material/styles';

const ErrorWrapper = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80%',
  minHeight: '100vh',
  textAlign: 'center',

  '& .content': {
    '& h1': {
      color: '#434e59',
      fontSize: '72px',
      fontWeight: '600',
      lineHeight: '72px',
      marginBottom: '24px',
    },

    '& .desc': {
      fontSize: '20px',
      lineHeight: '28px',
      marginBottom: '16px',
    },

    '& .actions': {
      '& button:not(:last-child)': {
        marginRight: '8px',
      },
    },
  },
});

export default ErrorWrapper;
