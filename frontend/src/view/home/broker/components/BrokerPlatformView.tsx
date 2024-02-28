import { Grid } from '@mui/material';
import { i18n } from 'src/i18n';
import AttrTypography from 'src/view/home/broker/shared/AttrTypography';
import MDTypography from 'src/mui/components/MDTypography';
import SingleCheckbox from 'src/view/home/broker/components/SingleCheckbox';
import BrokerSection from 'src/view/home/broker/components/BrokerSection';

function BrokerPlatformView({ record }) {
  return (
    <>
      <MDTypography variant="h3" pb={2}>
        {i18n(
          'entities.broker.platform.title',
          record.name,
        )}
      </MDTypography>
      <SingleCheckbox
        record={record}
        fields={[
          'TRADE_PLATFORM',
          'FREE_DEMO_ACCOUNT',
          'METATRADER_4',
          'METATRADER_5',
          'WEB_PLATFORM',
          'MOBILE_TRADING_APPS',
          'HEDGING_ALLOWED',
          'ADDITIONAL_TRADE_TOOLS',
          'AUTOMATED_TRADE_POSSIBLE',
          'API_INTERFACES',
          'SOCIAL_TRADING',
          'RATE_ALARMS',
          'PLATFORM_TUTORIALS',
          'LAYOUT_SAVEABLE',
        ]}
      />
      <Grid container>
        <BrokerSection>
          {i18n('entities.broker.platform.order_types')}
        </BrokerSection>
        <Grid md={8} xs={12} item>
          {record.order_types.map((v, idx) => (
            <AttrTypography key={idx} children={v} />
          ))}
        </Grid>
      </Grid>
      <SingleCheckbox
        record={record}
        fields={[
          'ONE_CLICK_TRADING',
          'TRADE_FROM_CHART',
          'ALL_POSITIONS_CLOSEABLE',
          'GUARANTEED_STOPS',
          'PHONE_TRADE_POSSIBLE',
        ]}
      />
    </>
  );
}

export default BrokerPlatformView;
