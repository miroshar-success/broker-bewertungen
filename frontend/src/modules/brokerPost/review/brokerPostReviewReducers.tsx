import actions from 'src/modules/brokerPost/review/brokerPostReviewActions';

const initialData = {
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.REVIEW_ALL_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.REVIEW_ALL_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.REVIEW_ALL_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.REVIEW_STARTED) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === actions.REVIEW_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === actions.REVIEW_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
