import { createSelector } from 'reselect';

const selectRaw = (state) => state.broker.comparison;

const selectRecordA = createSelector(
  [selectRaw],
  (raw) => raw.recordA,
);

const selectRecordB = createSelector(
  [selectRaw],
  (raw) => raw.recordB,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerComparisonSelectors = {
  selectLoading,
  selectRecordA,
  selectRecordB,
  selectRaw,
};

export default brokerComparisonSelectors;
