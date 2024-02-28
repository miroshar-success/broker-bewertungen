import { createSelector } from 'reselect';

const selectRaw = (state) => state.blogComment.spam;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const blogCommentSpamSelectors = {
  selectLoading,
};

export default blogCommentSpamSelectors;
