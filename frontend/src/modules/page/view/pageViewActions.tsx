import PageService from 'src/modules/page/pageService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PAGE_VIEW';

const pageViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: pageViewActions.FIND_STARTED,
      });

      const record = await PageService.find(id);

      dispatch({
        type: pageViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: pageViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/general-page');
    }
  },
};

export default pageViewActions;
