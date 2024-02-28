import { createSelector } from 'reselect';

const selectRaw = (state) => state.affiliateLink.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const affiliateLinkViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default affiliateLinkViewSelectors;
