import { i18n } from 'src/i18n';
import CompareCheckbox from 'src/view/home/broker/comparisons/CompareCheckbox';
import CompareRegion from 'src/view/home/broker/comparisons/CompareRegion';
import PropTypes from 'prop-types';

function CompareSpreadsAndFees({ recordA, recordB }) {
  return (
    <>
      <CompareRegion>
        {i18n(
          'entities.broker.comparison.region.spreadsAndFees',
          recordA.name,
          recordB.name,
        )}
      </CompareRegion>
      <CompareCheckbox
        recordA={recordA}
        recordB={recordB}
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

CompareSpreadsAndFees.propTypes = {
  recordA: PropTypes.any.isRequired,
  recordB: PropTypes.any.isRequired,
};

export default CompareSpreadsAndFees;
