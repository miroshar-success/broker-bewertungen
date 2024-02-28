import { createSelector } from 'reselect';

const selectRaw = (state) => state.sitemap;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const sitemapSelectors = {
  selectRaw,
  selectLoading,
};

export default sitemapSelectors;
