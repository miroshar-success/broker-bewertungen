import { createSelector } from 'reselect';

const selectRaw = (state) => state.broker.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerDestroySelectors = {
  selectLoading,
};

export default brokerDestroySelectors;
