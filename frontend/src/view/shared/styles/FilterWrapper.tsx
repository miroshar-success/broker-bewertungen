import { styled } from '@mui/material/styles';

const FilterWrapper = styled('div')(({ theme }) => ({
  marginBottom: '16px',

  '& form': {
    width: '100%',
  },
}));

export const FilterButtons = styled('div')({
  paddingTop: '8px',
  textAlign: 'right',

  '& > *': {
    marginLeft: '8px !important',
    marginBottom: '8px !important',
  },
});

export default FilterWrapper;
