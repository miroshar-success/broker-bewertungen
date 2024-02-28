import { i18n } from 'src/i18n';
import CompareCheckbox from 'src/view/home/broker/comparisons/CompareCheckbox';
import CompareRegion from 'src/view/home/broker/comparisons/CompareRegion';
import PropTypes from 'prop-types';

function CompareTradingPlatforms({ recordA, recordB }) {
  return (
    <>
      <CompareRegion>
        {i18n(
          'entities.broker.comparison.region.tradingPlatforms',
          recordA.name,
          recordB.name,
        )}
      </CompareRegion>
      <CompareCheckbox
        recordA={recordA}
        recordB={recordB}
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
          'LAYOUT_SAVEABLE',
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

CompareTradingPlatforms.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareTradingPlatforms;
