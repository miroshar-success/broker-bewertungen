import AuthorService from 'src/modules/author/authorService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'AUTHOR_VIEW';

const authorViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: authorViewActions.FIND_STARTED,
      });

      const record = await AuthorService.find(id);

      dispatch({
        type: authorViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: authorViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/author');
    }
  },
};

export default authorViewActions;
