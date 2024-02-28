import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerPost.review;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerPostReviewSelectors = {
  selectLoading,
};

export default brokerPostReviewSelectors;
