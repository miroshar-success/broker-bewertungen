import ApiResponseHandler from '../apiResponseHandler';
import SitemapService from '../../services/sitemap/sitemapService';
import ReCaptchaV2Service from '../../services/recaptcha/ReCaptchaV2Service';

export default async (req, res, next) => {
  try {
    await ReCaptchaV2Service.verify(req);

    const payload = await new SitemapService(req).refresh();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
