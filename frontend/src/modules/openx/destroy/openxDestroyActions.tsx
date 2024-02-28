import listActions from 'src/modules/openx/list/openxListActions';
import OpenxService from 'src/modules/openx/openxService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'OPENX_DESTROY';

const openxDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: openxDestroyActions.DESTROY_STARTED,
      });

      await OpenxService.destroyAll([id]);

      dispatch({
        type: openxDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.openx.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/open-x');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: openxDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: openxDestroyActions.DESTROY_ALL_STARTED,
      });

      await OpenxService.destroyAll(ids);

      dispatch({
        type: openxDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.openx.destroyAll.success'),
      );

      getHistory().push('/admin/open-x');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: openxDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default openxDestroyActions;
