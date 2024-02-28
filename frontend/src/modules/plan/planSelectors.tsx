import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';
import Plans from 'src/security/plans';

const selectRaw = (state) => state.plan;

const selectLoading = createSelector([selectRaw], (raw) =>
  Boolean(raw.loading),
);

const selectPermissionToEdit = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) =>
    new PermissionChecker(currentTenant, currentUser).match(
      Permissions.values.planEdit,
    ),
);

const selectIsPlanUser = createSelector(
  [
    authSelectors.selectCurrentTenant,
    authSelectors.selectCurrentUser,
  ],
  (currentTenant, currentUser) => {
    if (
      currentTenant.plan !== Plans.values.free &&
      currentTenant.planStatus !== 'cancel_at_period_end' &&
      currentTenant.planUserId !== currentUser.id
    ) {
      return false;
    }

    return true;
  },
);

const planSelectors = {
  selectPermissionToEdit,
  selectIsPlanUser,
  selectLoading,
  selectRaw,
};

export default planSelectors;
