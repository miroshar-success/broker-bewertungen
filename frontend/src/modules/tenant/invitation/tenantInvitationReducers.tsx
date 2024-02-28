import actions from 'src/modules/tenant/invitation/tenantInvitationActions';

const initialData = {
  loading: false,
  warningMessage: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.ACCEPT_FROM_AUTH_STARTED) {
    return {
      ...state,
      warningMessage: null,
      loading: true,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_SUCCESS) {
    return {
      ...state,
      loading: false,
      warningMessage: null,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_WARNING) {
    return {
      ...state,
      loading: false,
      warningMessage: payload,
    };
  }

  if (type === actions.ACCEPT_FROM_AUTH_ERROR) {
    return {
      ...state,
      loading: false,
      warningMessage: null,
    };
  }

  if (type === actions.ACCEPT_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.ACCEPT_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.ACCEPT_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DECLINE_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.DECLINE_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.DECLINE_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
