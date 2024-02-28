import ApiResponseHandler from '../apiResponseHandler';
import BlogCommentService from '../../services/blogCommentService';
import ReCaptchaV2Service from '../../services/recaptcha/ReCaptchaV2Service';

export default async (req, res, next) => {
  try {
    await ReCaptchaV2Service.verify(req);

    const payload = await new BlogCommentService(
      req,
    ).create(req.body.data);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
