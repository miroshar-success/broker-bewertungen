import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerPost.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerPostViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default brokerPostViewSelectors;
