import { createSelector } from 'reselect';
import authSelectors from 'src/modules/auth/authSelectors';
import PermissionChecker from 'src/modules/auth/permissionChecker';
import Permissions from 'src/security/permissions';

const selectPermissionToEdit = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) => (tenant) =>
    new PermissionChecker(tenant, currentUser).match(
      Permissions.values.tenantEdit,
    ),
);

const selectPermissionToDestroy = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) => (tenant) =>
    new PermissionChecker(tenant, currentUser).match(
      Permissions.values.tenantDestroy,
    ),
);

const selectInvitationToken = createSelector(
  [authSelectors.selectCurrentUser],
  (currentUser) => (tenant) => {
    if (!currentUser || !currentUser.tenants) {
      return false;
    }

    const tenantUser = currentUser.tenants.find(
      (tenantUser) =>
        tenantUser.tenant.id === tenant.id &&
        tenantUser.status === 'invited',
    );

    if (!tenantUser) {
      return null;
    }

    return tenantUser.invitationToken;
  },
);

const tenantSelectors = {
  selectPermissionToEdit,
  selectPermissionToDestroy,
  selectInvitationToken,
};

export default tenantSelectors;
