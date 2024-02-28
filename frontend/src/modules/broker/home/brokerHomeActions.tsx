import BrokerService from 'src/modules/broker/brokerService';
import selectors from 'src/modules/broker/home/brokerHomeSelectors';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_HOME';

const brokerHomeActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: brokerHomeActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      dispatch(brokerHomeActions.doFetchCurrentFilter());
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: brokerHomeActions.SORTER_CHANGED,
      payload: sorter,
    });

    dispatch(brokerHomeActions.doFetchCurrentFilter());
  },

  doFetchCurrentFilter:
    () => async (dispatch, getState) => {
      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        brokerHomeActions.doFetch(filter, rawFilter, true),
      );
    },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: brokerHomeActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await BrokerService.home(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: brokerHomeActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: brokerHomeActions.FETCH_ERROR,
        });
      }
    },
};

export default brokerHomeActions;
