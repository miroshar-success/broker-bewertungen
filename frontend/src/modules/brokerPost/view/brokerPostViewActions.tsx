import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BROKER_POST_VIEW';

const brokerPostViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: brokerPostViewActions.FIND_STARTED,
      });

      const record = await BrokerPostService.find(id);

      dispatch({
        type: brokerPostViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerPostViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/broker-post');
    }
  },
};

export default brokerPostViewActions;
