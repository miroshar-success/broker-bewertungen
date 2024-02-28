import listActions from 'src/modules/trackingParameter/list/trackingParameterListActions';
import TrackingParameterService from 'src/modules/trackingParameter/trackingParameterService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'TRACKING_PARAMETER_DESTROY';

const trackingParameterDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: trackingParameterDestroyActions.DESTROY_STARTED,
      });

      await TrackingParameterService.destroyAll([id]);

      dispatch({
        type: trackingParameterDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.trackingParameter.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/tracking-parameter');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: trackingParameterDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: trackingParameterDestroyActions.DESTROY_ALL_STARTED,
      });

      await TrackingParameterService.destroyAll(ids);

      dispatch({
        type: trackingParameterDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n(
          'entities.trackingParameter.destroyAll.success',
        ),
      );

      getHistory().push('/admin/tracking-parameter');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: trackingParameterDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default trackingParameterDestroyActions;
