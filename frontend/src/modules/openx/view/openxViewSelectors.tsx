import { createSelector } from 'reselect';

const selectRaw = (state) => state.openx.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const openxViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default openxViewSelectors;
