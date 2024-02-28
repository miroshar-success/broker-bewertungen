import { createSelector } from 'reselect';

const selectRaw = (state) => state.navigation.forexStrategy;

const selectLoading = createSelector(
  [selectRaw],
  (raw) => raw.loading,
);

const selectNavigation = createSelector(
  [selectRaw],
  (raw) => raw.navigation,
);

const navigationForexStrategySelectors = {
  selectLoading,
  selectNavigation,
};

export default navigationForexStrategySelectors;
