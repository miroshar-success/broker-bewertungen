import { createSelector } from 'reselect';

const selectRaw = (state) =>
  state.expertAdvisorTest.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const expertAdvisorTestDestroySelectors = {
  selectLoading,
};

export default expertAdvisorTestDestroySelectors;
