import actions from 'src/modules/blogComment/spam/blogCommentSpamActions';

const initialData = {
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.SPAM_ALL_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.SPAM_ALL_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.SPAM_ALL_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.SPAM_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.SPAM_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.SPAM_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
