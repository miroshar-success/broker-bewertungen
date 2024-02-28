import ApiResponseHandler from '../apiResponseHandler';
import AffiliateLinkService from '../../services/affiliateLinkService';

export default async (req, res, next) => {
  try {
    const payload = await new AffiliateLinkService(
      req,
    ).findByURL(req.body.url);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
