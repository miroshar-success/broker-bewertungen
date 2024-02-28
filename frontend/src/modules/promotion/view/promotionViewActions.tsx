import PromotionService from 'src/modules/promotion/promotionService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'PROMOTION_VIEW';

const promotionViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: promotionViewActions.FIND_STARTED,
      });

      const record = await PromotionService.find(id);

      dispatch({
        type: promotionViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: promotionViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/promotion');
    }
  },
};

export default promotionViewActions;
