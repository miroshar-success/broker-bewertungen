import { i18n } from 'src/i18n';
import MDBox from 'src/mui/components/MDBox';
import MDButton from 'src/mui/components/MDButton';
import MonitorIcon from '@mui/icons-material/Monitor';
import PropTypes from 'prop-types';
import SendIcon from '@mui/icons-material/Send';

function BrokerLinks({ record }) {
  return (
    <MDBox display="flex" flexDirection="column" gap={2}>
      <MDButton
        variant="contained"
        href={record.meta?.demo_url}
        color="success"
        startIcon={<MonitorIcon />}
        target="_blank"
        fullWidth
      >
        Demo-Konto
      </MDButton>
      <MDButton
        variant="contained"
        href={record.meta?.homepage}
        color="warning"
        startIcon={<SendIcon />}
        target="_blank"
        fullWidth
      >
        Zum Broker
      </MDButton>
    </MDBox>
  );
}

BrokerLinks.propTypes = {
  record: PropTypes.any.isRequired,
};

export default BrokerLinks;
