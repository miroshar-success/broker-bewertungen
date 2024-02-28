import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerPost.spam;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerPostSpamSelectors = {
  selectLoading,
};

export default brokerPostSpamSelectors;
