import { createSelector } from 'reselect';

const selectRaw = (state) => state.navigation.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const navigationViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default navigationViewSelectors;
