import { i18n } from 'src/i18n';
import CompareCheckbox from 'src/view/home/broker/comparisons/CompareCheckbox';
import CompareRegion from 'src/view/home/broker/comparisons/CompareRegion';
import PropTypes from 'prop-types';

function CompareTradable({ recordA, recordB }) {
  return (
    <>
      <CompareRegion>
        {i18n(
          'entities.broker.comparison.region.tradableMarketsAndProducts',
          recordA.name,
          recordB.name,
        )}
      </CompareRegion>
      <CompareCheckbox
        recordA={recordA}
        recordB={recordB}
        fields={[
          'TRADEABLE_MARKETS',
          'MARGIN',
          'SOCIAL_TRADING',
          'MANAGED_ACCOUNTS',
          'INSTANT_EXECUTION',
          'HEDGING_ALLOWED',
          'POSITIVE_SLIPPAGE_POSSIBLE',
          'ECN_ORDER_EXECUTION',
          'MICRO_LOTS',
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

CompareTradable.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareTradable;
