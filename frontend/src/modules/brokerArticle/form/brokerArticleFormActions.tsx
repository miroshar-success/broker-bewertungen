import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';

const prefix = 'BROKER_ARTICLE_FORM';

const brokerArticleFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BrokerArticleService.find(id);
      }

      dispatch({
        type: brokerArticleFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/broker-article');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: brokerArticleFormActions.CREATE_STARTED,
      });

      await BrokerArticleService.create(values);

      dispatch({
        type: brokerArticleFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.brokerArticle.create.success'),
      );

      getHistory().push('/admin/broker-article');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: brokerArticleFormActions.UPDATE_STARTED,
      });

      await BrokerArticleService.update(id, values);

      dispatch({
        type: brokerArticleFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.brokerArticle.update.success'),
      );

      getHistory().push('/admin/broker-article');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerArticleFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default brokerArticleFormActions;
