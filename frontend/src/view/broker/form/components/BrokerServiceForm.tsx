import { Grid } from '@mui/material';
import MDTypography from 'src/mui/components/MDTypography';
import BrokerCheckboxFormInput from 'src/view/broker/form/components/BrokerCheckboxFormInput';

function BrokerServiceForm(props) {
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="german_support"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="contact"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="daily_trade_help"
        />
      </Grid>
      <Grid item xs={12}>
        <MDTypography variant="h5" color="text">
          Training Opportunities
        </MDTypography>
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="german_webinar"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="german_seminar"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="coachings_available"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="knowledge_base"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerServiceForm;
