import ApiResponseHandler from '../apiResponseHandler';
import MuiService from '../../services/muiService';

export default async (req, res, next) => {
  try {
    const payload = await MuiService.findOrCreateDefault(
      req,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
