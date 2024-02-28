import { createSelector } from 'reselect';

const selectRaw = (state) => state.author.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const authorViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default authorViewSelectors;
