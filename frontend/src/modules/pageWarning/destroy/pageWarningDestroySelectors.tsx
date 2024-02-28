import { createSelector } from 'reselect';

const selectRaw = (state) => state.pageWarning.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const pageWarningDestroySelectors = {
  selectLoading,
};

export default pageWarningDestroySelectors;
