import { i18n } from 'src/i18n';
import MDTypography from 'src/mui/components/MDTypography';
import SingleCheckbox from 'src/view/home/broker/components/SingleCheckbox';

function BrokerSpreadsView({ record }) {
  return (
    <>
      <MDTypography variant="h3" pb={2}>
        {i18n('entities.broker.spread.title', record.name)}
      </MDTypography>
      <SingleCheckbox
        record={record}
        fields={[
          'COMMISSIONS',
          'IMPORTANT_MARKET_SPREADS',
          'COST_FOR_OVERNIGHT',
          'FEES_FOR_DEPOSIT_DISBURSAL',
          'FREE_ORDERCHANGE',
          'FREE_DEPOT',
          'NO_PLATFORM_FEES',
        ]}
      />
    </>
  );
}

export default BrokerSpreadsView;
