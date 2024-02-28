import { createSelector } from 'reselect';

const selectRaw = (state) => state.blogComment.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const blogCommentDestroySelectors = {
  selectLoading,
};

export default blogCommentDestroySelectors;
