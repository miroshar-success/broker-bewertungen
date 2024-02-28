import TenantService from 'src/modules/tenant/tenantService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';
import authSelectors from 'src/modules/auth/authSelectors';
import selectors from 'src/modules/tenant/invitation/tenantInvitationSelectors';
import AuthInvitationToken from 'src/modules/auth/authInvitationToken';

const prefix = 'TENANT_INVITATION';

const tenantInvitationActions = {
  RESET: `${prefix}_RESET`,

  ACCEPT_FROM_AUTH_STARTED: `${prefix}_ACCEPT_FROM_AUTH_STARTED`,
  ACCEPT_FROM_AUTH_SUCCESS: `${prefix}_ACCEPT_FROM_AUTH_SUCCESS`,
  ACCEPT_FROM_AUTH_WARNING: `${prefix}_ACCEPT_FROM_AUTH_WARNING`,
  ACCEPT_FROM_AUTH_ERROR: `${prefix}_ACCEPT_FROM_AUTH_ERROR`,

  ACCEPT_STARTED: `${prefix}_ACCEPT_STARTED`,
  ACCEPT_SUCCESS: `${prefix}_ACCEPT_SUCCESS`,
  ACCEPT_ERROR: `${prefix}_ACCEPT_ERROR`,

  DECLINE_STARTED: `${prefix}_DECLINE_STARTED`,
  DECLINE_SUCCESS: `${prefix}_DECLINE_SUCCESS`,
  DECLINE_ERROR: `${prefix}_DECLINE_ERROR`,

  doAcceptFromAuth:
    (token, forceAcceptOtherEmail = false) =>
    async (dispatch, getState) => {
      try {
        const isLoading = selectors.selectLoading(
          getState(),
        );

        if (isLoading) {
          return;
        }

        const isSignedIn = authSelectors.selectSignedIn(
          getState(),
        );

        if (!isSignedIn) {
          AuthInvitationToken.set(token);
          getHistory().push('/admin/auth/signup');
          return;
        }

        dispatch({
          type: tenantInvitationActions.ACCEPT_FROM_AUTH_STARTED,
        });

        const tenant = await TenantService.acceptInvitation(
          token,
          forceAcceptOtherEmail,
        );

        await dispatch(authActions.doSelectTenant(tenant));

        dispatch({
          type: tenantInvitationActions.ACCEPT_FROM_AUTH_SUCCESS,
        });
      } catch (error) {
        if (Errors.errorCode(error) === 404) {
          getHistory().push('/admin');
          return;
        }

        if (Errors.errorCode(error) === 400) {
          dispatch({
            type: tenantInvitationActions.ACCEPT_FROM_AUTH_WARNING,
            payload: Errors.selectMessage(error),
          });

          return;
        }

        Errors.handle(error);
        dispatch({
          type: tenantInvitationActions.ACCEPT_FROM_AUTH_ERROR,
        });
        getHistory().push('/admin');
      }
    },

  doAccept: (token) => async (dispatch) => {
    try {
      dispatch({
        type: tenantInvitationActions.ACCEPT_STARTED,
      });

      const tenant = await TenantService.acceptInvitation(
        token,
      );
      await dispatch(authActions.doSelectTenant(tenant));

      dispatch({
        type: tenantInvitationActions.ACCEPT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tenantInvitationActions.ACCEPT_ERROR,
      });
    }
  },

  doDecline: (token) => async (dispatch) => {
    try {
      dispatch({
        type: tenantInvitationActions.DECLINE_STARTED,
      });

      await TenantService.declineInvitation(token);
      await dispatch(authActions.doRefreshCurrentUser());

      dispatch({
        type: tenantInvitationActions.DECLINE_SUCCESS,
      });

      Message.success(i18n('tenant.invitation.declined'));

      getHistory().push('/admin/tenant');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tenantInvitationActions.DECLINE_ERROR,
      });
    }
  },
};

export default tenantInvitationActions;
