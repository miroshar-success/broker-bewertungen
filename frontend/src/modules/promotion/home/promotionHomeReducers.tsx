import actions from 'src/modules/promotion/home/promotionHomeActions';

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.HOME_STARTED) {
    return {
      ...state,
      rows: [],
      count: 0,
      loading: true,
    };
  }

  if (type === actions.HOME_SUCCESS) {
    return {
      ...state,
      loading: false,
      ...payload,
    };
  }

  if (type === actions.HOME_ERROR) {
    return {
      ...state,
      rows: [],
      count: 0,
      loading: false,
    };
  }

  return state;
};
