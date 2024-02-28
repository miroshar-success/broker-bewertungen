import PromotionService from 'src/modules/promotion/promotionService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'PROMOTION_HOME';

const promotionHomeActions = {
  HOME_STARTED: `${prefix}_HOME_STARTED`,
  HOME_SUCCESS: `${prefix}_HOME_SUCCESS`,
  HOME_ERROR: `${prefix}_HOME_ERROR`,

  doFetch: () => async (dispatch) => {
    try {
      dispatch({
        type: promotionHomeActions.HOME_STARTED,
      });

      const response = await PromotionService.home();

      dispatch({
        type: promotionHomeActions.HOME_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: promotionHomeActions.HOME_ERROR,
      });
    }
  },
};

export default promotionHomeActions;
