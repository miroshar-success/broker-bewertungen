import { getConfig } from '../../config';
import Error403 from '../../errors/Error403';
import verifier from 'captcha-verifier';

verifier.config({
  reCaptchaV2SecretKey: getConfig().RECAPTCHA_V2_SECRET_KEY,
});

class ReCaptchaV2Service {
  static async verify(req) {
    const [success, response] = await verifier.reCaptchaV2(
      req.body.recaptcha || req.body.data.recaptcha,
      req.ip,
    );

    if (!success) {
      throw new Error403();
    }
  }
}

export default ReCaptchaV2Service;
