import { createSelector } from 'reselect';

const selectRaw = (state) => state.openx.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const openxDestroySelectors = {
  selectLoading,
};

export default openxDestroySelectors;
