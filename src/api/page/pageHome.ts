import ApiResponseHandler from '../apiResponseHandler';
import PageService from '../../services/pageService';

export default async (req, res, next) => {
  try {
    const payload = await new PageService(req).findByURL(
      req.body.url,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
