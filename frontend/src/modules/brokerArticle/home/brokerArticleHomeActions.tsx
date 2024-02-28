import { getHistory } from 'src/modules/store';
import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'BROKER_ARTICLE_HOME';

const brokerArticleHomeActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (url) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleHomeActions.FIND_STARTED,
      });

      let record = await BrokerArticleService.findByURL(
        url,
      );

      if (record === '') {
        record = null;
      }

      dispatch({
        type: brokerArticleHomeActions.FIND_SUCCESS,
        payload: record,
      });

      if (!record) {
        getHistory().push('/404');
      }
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleHomeActions.FIND_ERROR,
      });
    }
  },
};

export default brokerArticleHomeActions;
