import ApiResponseHandler from '../apiResponseHandler';
import AuthService from '../../services/auth/authService';
import ReCaptchaV2Service from '../../services/recaptcha/ReCaptchaV2Service';

export default async (req, res, next) => {
  try {
    await ReCaptchaV2Service.verify(req);

    await AuthService.sendContact(
      req.language,
      req.body.name,
      req.body.email,
      req.body.subject,
      req.body.content,
    );

    const payload = true;

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
