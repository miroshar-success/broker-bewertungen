import { createSelector } from 'reselect';

const selectRaw = (state) => state.form;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectRefresh = createSelector([selectRaw], (raw) =>
  Boolean(raw.refresh),
);

const formSelectors = {
  selectRaw,
  selectLoading,
  selectRefresh,
};

export default formSelectors;
