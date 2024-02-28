import { createSelector } from 'reselect';

const selectRaw = (state) => state.author.home;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const authorHomeSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default authorHomeSelectors;
