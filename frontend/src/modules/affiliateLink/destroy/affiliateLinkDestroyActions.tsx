import listActions from 'src/modules/affiliateLink/list/affiliateLinkListActions';
import AffiliateLinkService from 'src/modules/affiliateLink/affiliateLinkService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'AFFILIATE_LINK_DESTROY';

const affiliateLinkDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: affiliateLinkDestroyActions.DESTROY_STARTED,
      });

      await AffiliateLinkService.destroyAll([id]);

      dispatch({
        type: affiliateLinkDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.affiliateLink.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/affiliate-link');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: affiliateLinkDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: affiliateLinkDestroyActions.DESTROY_ALL_STARTED,
      });

      await AffiliateLinkService.destroyAll(ids);

      dispatch({
        type: affiliateLinkDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.affiliateLink.destroyAll.success'),
      );

      getHistory().push('/admin/affiliate-link');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: affiliateLinkDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default affiliateLinkDestroyActions;
