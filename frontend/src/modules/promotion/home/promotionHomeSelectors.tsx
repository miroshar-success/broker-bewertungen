import { createSelector } from 'reselect';

const selectRaw = (state) => state.promotion.home;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
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

const promotionHomeSelectors = {
  selectLoading,
  selectRows,
  selectCount,
  selectHasRows,
};

export default promotionHomeSelectors;
