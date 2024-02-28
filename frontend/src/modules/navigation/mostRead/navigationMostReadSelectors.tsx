import { createSelector } from 'reselect';

const selectRaw = (state) => state.navigation.mostRead;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectNavigation = createSelector(
  [selectRaw],
  (raw) => raw.navigation,
);

const navigationMostReadSelectors = {
  selectLoading,
  selectNavigation,
};

export default navigationMostReadSelectors;
