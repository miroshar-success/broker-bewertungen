import TrackingParameterService from 'src/modules/trackingParameter/trackingParameterService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'TRACKING_PARAMETER_VIEW';

const trackingParameterViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: trackingParameterViewActions.FIND_STARTED,
      });

      const record = await TrackingParameterService.find(
        id,
      );

      dispatch({
        type: trackingParameterViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: trackingParameterViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/tracking-parameter');
    }
  },
};

export default trackingParameterViewActions;
