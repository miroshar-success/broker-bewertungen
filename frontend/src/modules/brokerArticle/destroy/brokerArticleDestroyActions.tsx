import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import Errors from 'src/modules/shared/error/errors';
import listActions from 'src/modules/brokerArticle/list/brokerArticleListActions';
import Message from 'src/view/shared/message';

const prefix = 'BROKER_ARTICLE_DESTROY';

const brokerArticleDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleDestroyActions.DESTROY_STARTED,
      });

      await BrokerArticleService.destroyAll([id]);

      dispatch({
        type: brokerArticleDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.brokerArticle.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerArticleDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleDestroyActions.DESTROY_ALL_STARTED,
      });

      await BrokerArticleService.destroyAll(ids);

      dispatch({
        type: brokerArticleDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.brokerArticle.destroyAll.success'),
      );
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerArticleDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default brokerArticleDestroyActions;
