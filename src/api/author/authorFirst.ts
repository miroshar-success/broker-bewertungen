import ApiResponseHandler from '../apiResponseHandler';
import AuthorService from '../../services/authorService';

export default async (req, res, next) => {
  try {
    const payload = await new AuthorService(req).first();

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
