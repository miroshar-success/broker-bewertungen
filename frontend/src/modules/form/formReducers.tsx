import formActions from 'src/modules/form/formActions';

const initialState = {
  loading: false,
  refresh: false,
};

export default (
  state = initialState,
  { type, payload },
) => {
  if (type === formActions.REFRESH) {
    return {
      ...state,
      refresh: payload,
    };
  }
  return state;
};
