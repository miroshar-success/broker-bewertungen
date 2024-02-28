import { createSelector } from 'reselect';

const selectRaw = (state) => state.category.home;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const categoryHomeSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default categoryHomeSelectors;
