import { createSelector } from 'reselect';

const selectRaw = (state) => state.tenant.destroy;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const tenantDestroySelectors = {
  selectLoading,
};

export default tenantDestroySelectors;
