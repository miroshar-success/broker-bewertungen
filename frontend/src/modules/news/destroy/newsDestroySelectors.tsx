import { createSelector } from 'reselect';

const selectRaw = (state) => state.news.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const newsDestroySelectors = {
  selectLoading,
};

export default newsDestroySelectors;
