import { i18n } from 'src/i18n';
import Icon from '@mui/material/Icon';
import MDTypography from 'src/mui/components/MDTypography';
import PropTypes from 'prop-types';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Grid';

function BrokerSection({ children, name, tooltip }) {
  return (
    <Grid md={4} xs={12} item>
      <MDTypography
        variant="h5"
        color="text"
        lineHeight="1.25"
        py={1}
      >
        {Boolean(children) && children}
        {!children &&
          Boolean(name) &&
          i18n(`entities.broker.comparison.${name}`)}
        {Boolean(tooltip) && (
          <Tooltip
            title={
              typeof tooltip === 'string'
                ? i18n(
                    `entities.broker.comparison.${tooltip}`,
                  )
                : tooltip
            }
          >
            <Icon color="secondary">help</Icon>
          </Tooltip>
        )}
      </MDTypography>
    </Grid>
  );
}

BrokerSection.defaultProps = {
  children: null,
  name: null,
  tooltip: null,
};

BrokerSection.propTypes = {
  children: PropTypes.any,
  name: PropTypes.string,
  tooltip: PropTypes.any,
};

export default BrokerSection;
