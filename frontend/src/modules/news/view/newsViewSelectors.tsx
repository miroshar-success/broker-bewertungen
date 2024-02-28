import { createSelector } from 'reselect';

const selectRaw = (state) => state.news.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const newsViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default newsViewSelectors;
