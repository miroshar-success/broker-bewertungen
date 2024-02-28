import ApiResponseHandler from '../apiResponseHandler';
import AuthService from '../../services/auth/authService';
import ReCaptchaV2Service from '../../services/recaptcha/ReCaptchaV2Service';

export default async (req, res, next) => {
  try {
    await ReCaptchaV2Service.verify(req);

    const payload = await AuthService.signin(
      req.body.email,
      req.body.password,
      req.body.invitationToken,
      req.body.tenantId,
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
