import { Grid } from '@mui/material';
import MDTypography from 'src/mui/components/MDTypography';
import BrokerCheckboxFormInput from 'src/view/broker/form/components/BrokerCheckboxFormInput';

function BrokerMarketsForm(props) {
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <MDTypography variant="h5" color="text">
          Tradable Markets and Fees
        </MDTypography>
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="tradeable_markets"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput {...props} name="margin" />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="social_trading"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="managed_accounts"
        />
      </Grid>
      <Grid item xs={12}>
        <MDTypography variant="h5" color="text">
          Forex Trading
        </MDTypography>
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="instant_execution"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="hedging_allowed"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="positive_slippage_possible"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="ecn_order_execution"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="liquidity_prodiver"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="micro_lots"
        />
      </Grid>
      <Grid item xs={12}>
        <MDTypography variant="h5" color="text">
          CFD Trading
        </MDTypography>
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="index_cfd_tradeable_below_point"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="rate_switch_24_5_index_cfd"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="no_financial_cost_index_cfd"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="no_financial_cost_raw_material_cfd"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="cfd_contracts_automatic_roll"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="real_stocks_cfd_spreads"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="dma_stocks"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="minimal_ordersize_stocks"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerMarketsForm;
