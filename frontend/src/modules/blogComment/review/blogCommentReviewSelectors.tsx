import { createSelector } from 'reselect';

const selectRaw = (state) => state.blogComment.review;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const blogCommentReviewSelectors = {
  selectLoading,
};

export default blogCommentReviewSelectors;
