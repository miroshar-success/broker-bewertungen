import { createSelector } from 'reselect';

const selectRaw = (state) => state.category.sidebar;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const categorySidebarSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default categorySidebarSelectors;
