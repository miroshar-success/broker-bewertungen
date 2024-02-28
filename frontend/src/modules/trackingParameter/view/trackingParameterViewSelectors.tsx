import { createSelector } from 'reselect';

const selectRaw = (state) => state.trackingParameter.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const trackingParameterViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default trackingParameterViewSelectors;
