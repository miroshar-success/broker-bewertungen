import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerArticle.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerArticleDestroySelectors = {
  selectLoading,
};

export default brokerArticleDestroySelectors;
