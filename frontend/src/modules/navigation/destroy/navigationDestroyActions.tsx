import listActions from 'src/modules/navigation/list/navigationListActions';
import NavigationService from 'src/modules/navigation/navigationService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'NAVIGATION_DESTROY';

const navigationDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: navigationDestroyActions.DESTROY_STARTED,
      });

      await NavigationService.destroyAll([id]);

      dispatch({
        type: navigationDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.navigation.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/navigation');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: navigationDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: navigationDestroyActions.DESTROY_ALL_STARTED,
      });

      await NavigationService.destroyAll(ids);

      dispatch({
        type: navigationDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.navigation.destroyAll.success'),
      );

      getHistory().push('/admin/navigation');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: navigationDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default navigationDestroyActions;
