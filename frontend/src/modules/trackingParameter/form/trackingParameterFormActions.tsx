import TrackingParameterService from 'src/modules/trackingParameter/trackingParameterService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'TRACKING_PARAMETER_FORM';

const trackingParameterFormActions = {
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
        type: trackingParameterFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await TrackingParameterService.find(id);
      }

      dispatch({
        type: trackingParameterFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: trackingParameterFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/tracking-parameter');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: trackingParameterFormActions.CREATE_STARTED,
      });

      await TrackingParameterService.create(values);

      dispatch({
        type: trackingParameterFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.trackingParameter.create.success'),
      );

      getHistory().push('/admin/tracking-parameter');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: trackingParameterFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: trackingParameterFormActions.UPDATE_STARTED,
      });

      await TrackingParameterService.update(id, values);

      dispatch({
        type: trackingParameterFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.trackingParameter.update.success'),
      );

      getHistory().push('/admin/tracking-parameter');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: trackingParameterFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default trackingParameterFormActions;
