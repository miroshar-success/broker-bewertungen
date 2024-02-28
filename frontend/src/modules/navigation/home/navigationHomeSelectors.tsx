import { createSelector } from 'reselect';

const selectRaw = (state) => state.navigation.home;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectNavigation = createSelector(
  [selectRaw],
  (raw) => raw.navigation,
);

const navigationHomeSelectors = {
  selectLoading,
  selectNavigation,
};

export default navigationHomeSelectors;
