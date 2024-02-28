import { Grid } from '@mui/material';
import MDTypography from 'src/mui/components/MDTypography';
import BrokerCheckboxFormInput from 'src/view/broker/form/components/BrokerCheckboxFormInput';

function BrokerSpreadsForm(props) {
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <MDTypography variant="h5" color="text">
          Spreads and Fees
        </MDTypography>
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="commissions"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="important_market_spreads"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="cost_for_overnight"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="fees_for_deposit_disbursal"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="free_orderchange"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="free_depot"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="no_platform_fees"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerSpreadsForm;
