import { createSelector } from 'reselect';

const selectRaw = (state) => state.navigation.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const navigationDestroySelectors = {
  selectLoading,
};

export default navigationDestroySelectors;
