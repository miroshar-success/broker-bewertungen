import actions from 'src/modules/plan/planActions';

const initialData = {
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.CHECKOUT_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.CHECKOUT_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.CHECKOUT_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.PORTAL_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.PORTAL_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.PORTAL_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
