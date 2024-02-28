import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerArticle.view;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerArticleViewSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default brokerArticleViewSelectors;
