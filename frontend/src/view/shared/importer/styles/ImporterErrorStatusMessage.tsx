import { styled } from '@mui/material/styles';
import { red } from '@mui/material/colors';

const ImporterErrorStatusMessage = styled('span')({
  whiteSpace: 'pre-wrap',
  wordWrap: 'break-word',
  color: red[500],
});

export default ImporterErrorStatusMessage;
