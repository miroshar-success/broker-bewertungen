import actions from 'src/modules/user/view/userViewActions';

const initialData = {
  loading: false,
  user: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      user: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      user: payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      user: null,
      loading: false,
    };
  }

  return state;
};
