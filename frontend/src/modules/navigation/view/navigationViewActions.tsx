import NavigationService from 'src/modules/navigation/navigationService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'NAVIGATION_VIEW';

const navigationViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: navigationViewActions.FIND_STARTED,
      });

      const record = await NavigationService.find(id);

      dispatch({
        type: navigationViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: navigationViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/navigation');
    }
  },
};

export default navigationViewActions;
