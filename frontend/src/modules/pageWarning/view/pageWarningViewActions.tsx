import PageWarningService from 'src/modules/pageWarning/pageWarningService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAGE_WARNING_VIEW';

const pageWarningViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: pageWarningViewActions.FIND_STARTED,
      });

      const record = await PageWarningService.find(id);

      dispatch({
        type: pageWarningViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: pageWarningViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/page-warning');
    }
  },
};

export default pageWarningViewActions;
