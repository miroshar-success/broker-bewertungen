import { createSelector } from 'reselect';

const selectRaw = (state) => state.blog.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const blogDestroySelectors = {
  selectLoading,
};

export default blogDestroySelectors;
