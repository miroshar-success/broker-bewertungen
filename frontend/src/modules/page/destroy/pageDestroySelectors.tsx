import { createSelector } from 'reselect';

const selectRaw = (state) => state.page.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const pageDestroySelectors = {
  selectLoading,
};

export default pageDestroySelectors;
