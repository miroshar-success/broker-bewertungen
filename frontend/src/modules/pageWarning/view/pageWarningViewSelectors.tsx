import { createSelector } from 'reselect';

const selectRaw = (state) => state.pageWarning.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const pageWarningViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default pageWarningViewSelectors;
