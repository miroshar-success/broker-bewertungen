import { i18n } from '../../../i18n';
import React from 'react';
import SingleCheckbox from './SingleCheckbox';
import Typography from '@mui/material/Typography';

function BrokerSpreadsView({ record }) {
  return (
    <>
      <Typography variant="h3" pb={2}>
        {i18n('entities.broker.spread.title', record.name)}
      </Typography>
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
