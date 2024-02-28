import actions from 'src/modules/broker/comparison/brokerComparisonActions';

const initialData = {
  loading: false,
  recordA: null,
  recordB: null,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.FIND_STARTED) {
    return {
      ...state,
      recordA: null,
      recordB: null,
      loading: true,
    };
  }

  if (type === actions.FIND_SUCCESS) {
    return {
      ...state,
      ...payload,
      loading: false,
    };
  }

  if (type === actions.FIND_ERROR) {
    return {
      ...state,
      recordA: null,
      recordB: null,
      loading: false,
    };
  }

  return state;
};
