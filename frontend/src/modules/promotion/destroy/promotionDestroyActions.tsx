import listActions from 'src/modules/promotion/list/promotionListActions';
import PromotionService from 'src/modules/promotion/promotionService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'PROMOTION_DESTROY';

const promotionDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: promotionDestroyActions.DESTROY_STARTED,
      });

      await PromotionService.destroyAll([id]);

      dispatch({
        type: promotionDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.promotion.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/promotion');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: promotionDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: promotionDestroyActions.DESTROY_ALL_STARTED,
      });

      await PromotionService.destroyAll(ids);

      dispatch({
        type: promotionDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.promotion.destroyAll.success'),
      );

      getHistory().push('/admin/promotion');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: promotionDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default promotionDestroyActions;
