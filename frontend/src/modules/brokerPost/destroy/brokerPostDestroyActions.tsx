import listActions from 'src/modules/brokerPost/list/brokerPostListActions';
import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BROKER_POST_DESTROY';

const brokerPostDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy:
    (id, redirect_url = '/admin/broker-post') =>
    async (dispatch) => {
      try {
        dispatch({
          type: brokerPostDestroyActions.DESTROY_STARTED,
        });

        await BrokerPostService.destroyAll([id]);

        dispatch({
          type: brokerPostDestroyActions.DESTROY_SUCCESS,
        });

        Message.success(
          i18n('entities.brokerPost.destroy.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());

        getHistory().push(redirect_url);
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: brokerPostDestroyActions.DESTROY_ERROR,
        });
      }
    },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: brokerPostDestroyActions.DESTROY_ALL_STARTED,
      });

      await BrokerPostService.destroyAll(ids);

      dispatch({
        type: brokerPostDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.brokerPost.destroyAll.success'),
      );

      getHistory().push('/admin/broker-post');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerPostDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default brokerPostDestroyActions;
