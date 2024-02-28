import { createSelector } from 'reselect';

const selectRaw = (state) => state.broker.featured;

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

const brokerFeaturedSelectors = {
  selectLoading,
  selectRows,
  selectCount,
  selectHasRows,
};

export default brokerFeaturedSelectors;
