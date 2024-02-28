import { createSelector } from 'reselect';

const selectRaw = (state) => state.navigation.forexSchool;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectNavigation = createSelector(
  [selectRaw],
  (raw) => raw.navigation,
);

const navigationForexSchoolSelectors = {
  selectLoading,
  selectNavigation,
};

export default navigationForexSchoolSelectors;
