import { createSelector } from 'reselect';

const selectRaw = (state) => state.affiliateLink.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const affiliateLinkDestroySelectors = {
  selectLoading,
};

export default affiliateLinkDestroySelectors;
