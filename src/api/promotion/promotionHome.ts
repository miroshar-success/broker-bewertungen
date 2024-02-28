import ApiResponseHandler from '../apiResponseHandler';
import PromotionService from '../../services/promotionService';

export default async (req, res, next) => {
  try {
    const payload = await new PromotionService(
      req,
    ).findAndCountAll({
      filter: {
        activated: true,
      },
    });

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
