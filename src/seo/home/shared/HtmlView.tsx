import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import React from 'react';

const HtmlStyled = styled('div')(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  '& ul, ol': {
    paddingLeft: '3rem',
  },
  '& h1, h2, h3, h4, h5, h6, u strong': {
    display: 'block',
    lineHeight: '200%',
    marginTop: '1rem',
  },
  '& p': {
    marginBottom: '10px',
  },
  '& .table': {
    marginBottom: '20px',
    borderCollapse: 'collapse',
  },
  '& .table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th':
    {
      padding: '8px',
      lineHeight: '1.42857143',
      verticalAlign: 'top',
      borderTop: '1px solid #ddd',
    },
  '& .table > thead > tr > th': {
    verticalAlign: 'bottom',
    textAlign: 'left',
    borderBottom: '2px solid #ddd',
  },
  '& .table > thead > tr:first-of-type > th': {
    borderTop: 0,
  },
  '& .table-hover > tbody > tr:hover': {
    backgroundColor: '#f5f5f5',
  },
}));

export const HtmlViewWrapper = ({ children }) => {
  return (
    <Box color="text">
      <HtmlStyled>{children}</HtmlStyled>
    </Box>
  );
};

function HtmlView({ value }) {
  return <HtmlViewWrapper>{parse(value)}</HtmlViewWrapper>;
}

HtmlView.propTypes = {
  value: PropTypes.any.isRequired,
};

export default HtmlView;
