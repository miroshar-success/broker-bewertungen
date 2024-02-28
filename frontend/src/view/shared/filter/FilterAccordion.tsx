import {
  Accordion,
  AccordionProps,
  styled,
} from '@mui/material';
import rgba from 'src/mui/assets/theme/functions/rgba';

export default styled((props: AccordionProps) => (
  <Accordion {...props} />
))(({ theme }) => ({
  backgroundColor: rgba('#ffffff', 0.02),
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
  '&$expanded': {
    margin: 'auto',
  },
}));
