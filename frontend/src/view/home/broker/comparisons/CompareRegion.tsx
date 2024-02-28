import { i18n } from 'src/i18n';
import Grid from '@mui/material/Grid';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';

function CompareRegion({ children, name }) {
  return (
    <Grid spacing={2} container>
      <Grid xs={12} item>
        <MDTypography
          variant="h3"
          color="text"
          lineHeight="1.25"
          my={1}
        >
          {Boolean(children) && children}
          {!children &&
            Boolean(name) &&
            i18n(`entities.broker.comparison.${name}`)}
        </MDTypography>
      </Grid>
    </Grid>
  );
}

CompareRegion.defaultProps = {
  children: null,
  name: null,
};

CompareRegion.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
};

export default CompareRegion;
