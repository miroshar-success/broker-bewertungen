import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import brokerEnumerators from 'src/modules/broker/brokerEnumerators';
import BrokerCheckboxFormInput from 'src/view/broker/form/components/BrokerCheckboxFormInput';
import SelectFormItem from 'src/view/shared/form/items/SelectFormItem';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';

function BrokerPlatformForm(props) {
  const { record } = props;
  return (
    <Grid spacing={2} container>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="trade_platform"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="free_demo_account"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="metatrader_4"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="metatrader_5"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="web_platform"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="mobile_trading_apps"
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
          name="additional_trade_tools"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="automated_trade_possible"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="api_interfaces"
        />
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
          name="rate_alarms"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="platform_tutorials"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="layout_saveable"
        />
      </Grid>
      <Grid item xs={12}>
        <FieldSetViewItem
          label={i18n('entities.broker.fields.order_types')}
        >
          <SelectFormItem
            name="order_types"
            label={i18n(
              'entities.broker.fields.order_types',
            )}
            options={brokerEnumerators.order_type.type.map(
              (value) => ({
                value,
                label: i18n(
                  `entities.broker.enumerators.order_type.type.${value}`,
                ),
              }),
            )}
            variant="standard"
            mode="multiple"
          />
        </FieldSetViewItem>
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="one_click_trading"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="trade_from_chart"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="all_positions_closeable"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="guaranteed_stops"
        />
      </Grid>
      <Grid item xs={12}>
        <BrokerCheckboxFormInput
          {...props}
          name="phone_trade_possible"
        />
      </Grid>
    </Grid>
  );
}

export default BrokerPlatformForm;
