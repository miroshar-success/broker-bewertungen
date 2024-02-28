import BrokerService from 'src/modules/broker/brokerService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_COMPARABLE';

const brokerComparableActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: brokerComparableActions.FETCH_STARTED,
      });

      const response = await BrokerService.comparable();

      dispatch({
        type: brokerComparableActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerComparableActions.FETCH_ERROR,
      });
    }
  },
};

export default brokerComparableActions;
