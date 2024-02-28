import { createSelector } from 'reselect';

const selectRaw = (state) => state.blog.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const blogViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default blogViewSelectors;
