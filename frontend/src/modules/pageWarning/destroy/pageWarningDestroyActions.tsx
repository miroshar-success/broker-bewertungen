import listActions from 'src/modules/pageWarning/list/pageWarningListActions';
import PageWarningService from 'src/modules/pageWarning/pageWarningService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PAGE_WARNING_DESTROY';

const pageWarningDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: pageWarningDestroyActions.DESTROY_STARTED,
      });

      await PageWarningService.destroyAll([id]);

      dispatch({
        type: pageWarningDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.pageWarning.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/page-warning');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: pageWarningDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: pageWarningDestroyActions.DESTROY_ALL_STARTED,
      });

      await PageWarningService.destroyAll(ids);

      dispatch({
        type: pageWarningDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.pageWarning.destroyAll.success'),
      );

      getHistory().push('/admin/page-warning');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: pageWarningDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default pageWarningDestroyActions;
