import { createSelector } from 'reselect';

const selectRaw = (state) => state.promotion.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const promotionViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default promotionViewSelectors;
