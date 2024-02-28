import listActions from 'src/modules/brokerPost/list/brokerPostListActions';
import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BROKER_POST_SPAM';

const brokerPostSpamActions = {
  SPAM_STARTED: `${prefix}_SPAM_STARTED`,
  SPAM_SUCCESS: `${prefix}_SPAM_SUCCESS`,
  SPAM_ERROR: `${prefix}_SPAM_ERROR`,

  SPAM_ALL_STARTED: `${prefix}_SPAM_ALL_STARTED`,
  SPAM_ALL_SUCCESS: `${prefix}_SPAM_ALL_SUCCESS`,
  SPAM_ALL_ERROR: `${prefix}_SPAM_ALL_ERROR`,

  doSpam:
    (id, redirect_url = '/admin/broker-post') =>
    async (dispatch) => {
      try {
        dispatch({
          type: brokerPostSpamActions.SPAM_STARTED,
        });

        await BrokerPostService.spamAll([id]);

        dispatch({
          type: brokerPostSpamActions.SPAM_SUCCESS,
        });

        Message.success(
          i18n('entities.brokerPost.spam.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());

        getHistory().push(redirect_url);
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: brokerPostSpamActions.SPAM_ERROR,
        });
      }
    },

  doSpamAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: brokerPostSpamActions.SPAM_ALL_STARTED,
      });

      await BrokerPostService.spamAll(ids);

      dispatch({
        type: brokerPostSpamActions.SPAM_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.brokerPost.spamAll.success'),
      );

      getHistory().push('/admin/broker-post');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerPostSpamActions.SPAM_ALL_ERROR,
      });
    }
  },
};

export default brokerPostSpamActions;
