import { createSelector } from 'reselect';

const selectRaw = (state) => state.broker.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default brokerViewSelectors;
