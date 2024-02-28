import colors from 'src/mui/assets/theme/base/colors';
import { styled } from '@mui/material/styles';
import parse from 'html-react-parser';
import PropTypes from 'prop-types';
import MDBox from 'src/mui/components/MDBox';
import LazyLoad from 'react-lazy-load';

const HtmlStyled = styled('div')(() => ({
  fontSize: '1rem',
  fontWeight: 400,
  '& a': {
    color: colors.info.main,
  },
  '& ul, ol': {
    paddingLeft: '3rem',
  },
  '& h1, h2, h3, h4, h5, h6, u strong': {
    display: 'block',
    lineHeight: 1.375,
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
  '& iframe': {
    maxWidth: '100% !important',
  },
  '& img': {
    maxWidth: '100% !important',
    height: 'auto !important',
  },
}));

export const HtmlViewWrapper = ({ children }) => {
  return (
    // <LazyLoad>
    <MDBox color="text">
      <HtmlStyled>{children}</HtmlStyled>
    </MDBox>
    // </LazyLoad>
  );
};

function HtmlView({ value }) {
  return <HtmlViewWrapper>{parse(value)}</HtmlViewWrapper>;
}

HtmlView.propTypes = {
  value: PropTypes.any.isRequired,
};

export default HtmlView;
