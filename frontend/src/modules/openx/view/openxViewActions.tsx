import OpenxService from 'src/modules/openx/openxService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'OPENX_VIEW';

const openxViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: openxViewActions.FIND_STARTED,
      });

      const record = await OpenxService.find(id);

      dispatch({
        type: openxViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: openxViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/open-x');
    }
  },
};

export default openxViewActions;
