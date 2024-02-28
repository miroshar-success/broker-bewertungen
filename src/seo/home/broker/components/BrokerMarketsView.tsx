import { i18n } from '../../../i18n';
import React from 'react';
import SingleCheckbox from './SingleCheckbox';
import Typography from '@mui/material/Typography';

function BrokerMarketsView({ record }) {
  return (
    <>
      <Typography variant="h3" pb={2}>
        {i18n('entities.broker.market.title', record.name)}
      </Typography>
      <SingleCheckbox
        record={record}
        fields={[
          'TRADEABLE_MARKETS',
          'MARGIN',
          'SOCIAL_TRADING',
          'MANAGED_ACCOUNTS',
        ]}
      />
      <Typography variant="h3" py={2}>
        {i18n(
          'entities.broker.market.forex_trading_at_activities',
          record.name,
        )}
      </Typography>
      <SingleCheckbox
        record={record}
        fields={[
          'INSTANT_EXECUTION',
          'HEDGING_ALLOWED',
          'POSITIVE_SLIPPAGE_POSSIBLE',
          'ECN_ORDER_EXECUTION',
          'LIQUIDITY_PRODIVER',
          'MICRO_LOTS',
        ]}
      />
      <Typography variant="h3" py={2}>
        {i18n(
          'entities.broker.market.cfd_trading_at_activTrades',
          record.name,
        )}
      </Typography>
      <SingleCheckbox
        record={record}
        fields={[
          'INDEX_CFD_TRADEABLE_BELOW_POINT',
          'RATE_SWITCH_24_5_INDEX_CFD',
          'NO_FINANCIAL_COST_INDEX_CFD',
          'NO_FINANCIAL_COST_RAW_MATERIAL_CFD',
          'CFD_CONTRACTS_AUTOMATIC_ROLL',
          'REAL_STOCKS_CFD_SPREADS',
          'DMA_STOCKS',
          'MINIMAL_ORDERSIZE_STOCKS',
        ]}
      />
    </>
  );
}

export default BrokerMarketsView;
