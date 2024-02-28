import formSelectors from 'src/modules/form/formSelectors';

const prefix = 'FORM_ACTIONS';

const formActions = {
  REFRESH: `${prefix}_REFRESH`,

  doRefresh: () => (dispatch, getState) => {
    dispatch({
      type: formActions.REFRESH,
      payload: !formSelectors.selectRefresh(getState()),
    });
  },
};

export default formActions;
