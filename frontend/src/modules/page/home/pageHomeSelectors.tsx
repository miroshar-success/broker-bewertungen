import { createSelector } from 'reselect';

const selectRaw = (state) => state.page.home;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const pageHomeSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default pageHomeSelectors;
