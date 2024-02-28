import { createSelector } from 'reselect';

const selectRaw = (state) => state.author.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const authorDestroySelectors = {
  selectLoading,
};

export default authorDestroySelectors;
