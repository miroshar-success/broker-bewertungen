import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.trackingParameter.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const trackingParameterDestroySelectors = {
  selectLoading,
};

export default trackingParameterDestroySelectors;
