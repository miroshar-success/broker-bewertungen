import { createSelector } from 'reselect';

const selectRaw = (state) => state.broker.top;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectRows = createSelector(
  [selectRaw],
  (raw) => raw.rows,
);

const selectCount = createSelector(
  [selectRaw],
  (raw) => raw.count,
);

const selectHasRows = createSelector(
  [selectCount],
  (count) => count > 0,
);

const brokerTopSelectors = {
  selectLoading,
  selectRows,
  selectCount,
  selectHasRows,
};

export default brokerTopSelectors;
