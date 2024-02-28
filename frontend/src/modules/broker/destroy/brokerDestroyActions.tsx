import listActions from 'src/modules/broker/list/brokerListActions';
import BrokerService from 'src/modules/broker/brokerService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BROKER_DESTROY';

const brokerDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: brokerDestroyActions.DESTROY_STARTED,
      });

      await BrokerService.destroyAll([id]);

      dispatch({
        type: brokerDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.broker.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/broker');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: brokerDestroyActions.DESTROY_ALL_STARTED,
      });

      await BrokerService.destroyAll(ids);

      dispatch({
        type: brokerDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.broker.destroyAll.success'),
      );

      getHistory().push('/admin/broker');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default brokerDestroyActions;
