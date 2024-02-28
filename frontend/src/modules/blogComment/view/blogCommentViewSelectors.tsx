import { createSelector } from 'reselect';

const selectRaw = (state) => state.blogComment.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const blogCommentViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default blogCommentViewSelectors;
