import BrokerService from 'src/modules/broker/brokerService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_COMPARISON';

const brokerComparisonActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (urlA, urlB) => async (dispatch) => {
    try {
      dispatch({
        type: brokerComparisonActions.FIND_STARTED,
      });

      const recordA = await BrokerService.view(urlA);
      const recordB = await BrokerService.view(urlB);

      dispatch({
        type: brokerComparisonActions.FIND_SUCCESS,
        payload: {
          recordA,
          recordB,
        },
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerComparisonActions.FIND_ERROR,
      });
    }
  },
};

export default brokerComparisonActions;
