import { createSelector } from 'reselect';

const selectRaw = (state) => state.promotion.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const promotionDestroySelectors = {
  selectLoading,
};

export default promotionDestroySelectors;
