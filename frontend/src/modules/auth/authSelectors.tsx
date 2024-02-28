import { createSelector } from 'reselect';
import AuthCurrentTenant from './authCurrentTenant';
import { tenantSubdomain } from '../tenant/tenantSubdomain';
import _get from 'lodash/get';

const selectRaw = (state) => state.auth;

const selectAuthenticationUser = createSelector(
  [selectRaw],
  (auth) => auth.authenticationUser,
);

const selectCurrentUser = createSelector(
  [selectRaw],
  (auth) => auth.currentUser,
);

const selectCurrentTenant = createSelector(
  [selectRaw],
  (raw) => {
    return raw.currentTenant;
  },
);

const selectCurrentUserEmail = createSelector(
  [selectCurrentUser],
  (currentUser) => (currentUser ? currentUser.email : null),
);

const selectCurrentUserFullName = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    currentUser ? currentUser.fullName : '',
);

const selectSignedIn = createSelector(
  [selectCurrentUser],
  (currentUser) =>
    Boolean(currentUser) && Boolean(currentUser.id),
);

const selectRoles = createSelector(
  [selectCurrentUser, selectCurrentTenant],
  (currentUser, currentTenant) => {
    if (!currentUser) {
      return [];
    }

    if (!currentTenant) {
      return [];
    }

    const tenantUser = currentUser.tenants.find(
      (userTenant) =>
        userTenant.tenant.id === currentTenant.id,
    );

    if (!tenantUser) {
      return [];
    }

    return tenantUser.roles;
  },
);

const selectLoading = createSelector([selectRaw], (auth) =>
  Boolean(auth.loading),
);

const selectLoadingInit = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingInit),
);

const selectLoadingContact = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingContact),
);

const selectLoadingEmailConfirmation = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingEmailConfirmation),
);

const selectLoadingPasswordResetEmail = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingPasswordResetEmail),
);

const selectLoadingPasswordReset = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingPasswordReset),
);

const selectLoadingVerifyEmail = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingVerifyEmail),
);

const selectLoadingPasswordChange = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingPasswordChange),
);

const selectLoadingUpdateProfile = createSelector(
  [selectRaw],
  (auth) => Boolean(auth.loadingUpdateProfile),
);

const selectErrorMessage = createSelector(
  [selectRaw],
  (auth) => auth.errorMessage,
);

const selectErrorMessageVerifyEmail = createSelector(
  [selectRaw],
  (auth) => auth.errorMessageVerifyEmail,
);
const selectCurrentUserNameOrEmailPrefix = createSelector(
  [selectCurrentUser, selectCurrentUserFullName],
  (currentUser, fullName) => {
    if (!currentUser) {
      return '';
    }

    if (fullName && fullName.length < 25) {
      return fullName;
    }

    if (currentUser.firstName) {
      return currentUser.firstName;
    }

    return currentUser.email.split('@')[0];
  },
);

const selectCurrentUserAvatar = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (
      !currentUser ||
      !currentUser.avatars ||
      !currentUser.avatars.length ||
      !currentUser.avatars[0].downloadUrl
    ) {
      return null;
    }

    return currentUser.avatars[0].downloadUrl;
  },
);

const selectInvitedTenants = createSelector(
  [selectCurrentUser],
  (currentUser) => {
    if (!currentUser || !currentUser.tenants) {
      return [];
    }

    return currentUser.tenants
      .filter(
        (tenantUser) => tenantUser.status === 'invited',
      )
      .map((tenantUser) => tenantUser.tenant);
  },
);

const selectCurrentSettings = createSelector(
  [selectCurrentTenant],
  // The idea of this method is to refresh
  // where is using if the current tenant changes
  (currentTenant) => {
    return AuthCurrentTenant.getSettings();
  },
);

const selectCurrentMui = createSelector(
  [selectCurrentTenant],
  // The idea of this method is to refresh
  // where is using if the current user changes
  (currentTenant) => {
    return AuthCurrentTenant.getMuiSettings();
  },
);

const selectDefaultTaskPriority = createSelector(
  [selectCurrentTenant],
  // The idea of this method is to refresh
  // where is using if the current user changes
  (currentTenant) => {
    return AuthCurrentTenant.getDefaultTaskPriority();
  },
);

const selectBackgroundImageUrl = createSelector(
  [selectCurrentTenant],
  // The idea of this method is to refresh
  // where is using if the current tenant changes
  (currentTenant) => {
    if (
      tenantSubdomain.isEnabled &&
      tenantSubdomain.isRootDomain
    ) {
      return null;
    }

    const settings = AuthCurrentTenant.getSettings();

    return _get(
      settings,
      'backgroundImageUrl',
      _get(
        settings,
        'backgroundImages[0].downloadUrl',
        null,
      ),
    );
  },
);

const selectLogoUrl = createSelector(
  [selectCurrentTenant],
  // The idea of this method is to refresh
  // where is using if the current tenant changes
  (currentTenant) => {
    if (
      tenantSubdomain.isEnabled &&
      tenantSubdomain.isRootDomain
    ) {
      return null;
    }

    const settings = AuthCurrentTenant.getSettings();

    return _get(
      settings,
      'logoUrl',
      _get(settings, 'logos[0].downloadUrl', null),
    );
  },
);

const authSelectors = {
  selectAuthenticationUser,
  selectBackgroundImageUrl,
  selectCurrentMui,
  selectCurrentSettings,
  selectCurrentTenant,
  selectCurrentUser,
  selectCurrentUserAvatar,
  selectCurrentUserEmail,
  selectCurrentUserFullName,
  selectCurrentUserNameOrEmailPrefix,
  selectDefaultTaskPriority,
  selectErrorMessage,
  selectErrorMessageVerifyEmail,
  selectInvitedTenants,
  selectLoading,
  selectLoadingContact,
  selectLoadingEmailConfirmation,
  selectLoadingInit,
  selectLoadingPasswordChange,
  selectLoadingPasswordReset,
  selectLoadingPasswordResetEmail,
  selectLoadingUpdateProfile,
  selectLoadingVerifyEmail,
  selectLogoUrl,
  selectRaw,
  selectRoles,
  selectSignedIn,
};

export default authSelectors;
