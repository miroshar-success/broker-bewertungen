import { createSelector } from 'reselect';

const selectRaw = (state) => state.brokerArticle.home;

const selectRecord = createSelector(
  [selectRaw],
  (raw) => raw.record,
);

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const brokerArticleHomeSelectors = {
  selectLoading,
  selectRecord,
  selectRaw,
};

export default brokerArticleHomeSelectors;
