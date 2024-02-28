import NewsService from 'src/modules/news/newsService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'NEWS_VIEW';

const newsViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: newsViewActions.FIND_STARTED,
      });

      const record = await NewsService.find(id);

      dispatch({
        type: newsViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/news');
    }
  },
};

export default newsViewActions;
