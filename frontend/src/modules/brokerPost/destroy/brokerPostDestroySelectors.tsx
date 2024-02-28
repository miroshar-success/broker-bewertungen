import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerPost.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerPostDestroySelectors = {
  selectLoading,
};

export default brokerPostDestroySelectors;
