import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'BROKER_ARTICLE_VIEW';

const brokerArticleViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleViewActions.FIND_STARTED,
      });

      const record = await BrokerArticleService.find(id);

      dispatch({
        type: brokerArticleViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/broker-article');
    }
  },
};

export default brokerArticleViewActions;
