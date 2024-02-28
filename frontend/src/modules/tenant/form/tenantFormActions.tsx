import TenantService from 'src/modules/tenant/tenantService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import authActions from 'src/modules/auth/authActions';

const prefix = 'TENANT_FORM';

const tenantFormActions = {
  RESET: `${prefix}_RESET`,

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
        type: tenantFormActions.INIT_STARTED,
      });

      const isEdit = Boolean(id);

      let record = {};

      if (isEdit) {
        record = await TenantService.find(id);
      }

      dispatch({
        type: tenantFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tenantFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/tenant');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: tenantFormActions.CREATE_STARTED,
      });

      const tenant = await TenantService.create(values);
      await dispatch(authActions.doSelectTenant(tenant));

      dispatch({
        type: tenantFormActions.CREATE_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tenantFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: tenantFormActions.UPDATE_STARTED,
      });

      const tenant = await TenantService.update(id, values);

      dispatch({
        type: tenantFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('tenant.update.success'));
      await dispatch(authActions.doSelectTenant(tenant));
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: tenantFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default tenantFormActions;
