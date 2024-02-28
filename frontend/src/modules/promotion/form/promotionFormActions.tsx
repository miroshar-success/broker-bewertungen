import PromotionService from 'src/modules/promotion/promotionService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'PROMOTION_FORM';

const promotionFormActions = {
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
        type: promotionFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await PromotionService.find(id);
      }

      dispatch({
        type: promotionFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: promotionFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/promotion');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: promotionFormActions.CREATE_STARTED,
      });

      await PromotionService.create(values);

      dispatch({
        type: promotionFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.promotion.create.success'),
      );

      getHistory().push('/admin/promotion');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: promotionFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: promotionFormActions.UPDATE_STARTED,
      });

      await PromotionService.update(id, values);

      dispatch({
        type: promotionFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.promotion.update.success'),
      );

      getHistory().push('/admin/promotion');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: promotionFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default promotionFormActions;
