import BrokerService from 'src/modules/broker/brokerService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_TOP';

const brokerTopActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: brokerTopActions.FETCH_STARTED,
      });

      const response = await BrokerService.top();

      dispatch({
        type: brokerTopActions.FETCH_SUCCESS,
        payload: {
          rows: response.rows,
          count: response.count,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerTopActions.FETCH_ERROR,
      });
    }
  },
};

export default brokerTopActions;
