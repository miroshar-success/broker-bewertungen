import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import MDButton from 'src/mui/components/MDButton';
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';

function BrokerHomepageUrls({ record }) {
  return (
    <>
      <Grid spacing={2} container pt={3}>
        {record.forex_signale || record.expert_advisor ? (
          <Grid xs={12} item>
            <MDButton
              variant="contained"
              href={record.meta?.homepage}
              target="_blank"
              color="warning"
              startIcon={<SendIcon />}
              fullWidth
            >
              {i18n(
                'entities.broker.text.nowTo',
                record.name,
              )}
            </MDButton>
          </Grid>
        ) : (
          <>
            <Grid md={6} xs={12} item>
              <MDButton
                variant="contained"
                href={record.meta?.homepage}
                target="_blank"
                color="warning"
                startIcon={<SendIcon />}
                fullWidth
              >
                {i18n(
                  'entities.broker.text.nowTo',
                  record.name,
                )}
              </MDButton>
            </Grid>
            <Grid md={6} xs={12} item>
              <MDButton
                variant="contained"
                target="_blank"
                href={record.meta?.demo_url}
                color="info"
                startIcon={<SendIcon />}
                fullWidth
              >
                {i18n(
                  'entities.broker.text.freeDemoAccount',
                )}
              </MDButton>
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
}

BrokerHomepageUrls.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerHomepageUrls;
