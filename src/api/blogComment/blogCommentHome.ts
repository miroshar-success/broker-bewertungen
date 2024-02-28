import ApiResponseHandler from '../apiResponseHandler';
import BlogCommentService from '../../services/blogCommentService';

export default async (req, res, next) => {
  try {
    const payload = await new BlogCommentService(
      req,
    ).findAndCountAll(req.query);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
