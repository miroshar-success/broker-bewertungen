import ApiResponseHandler from '../apiResponseHandler';
import BlogService from '../../services/blogService';

export default async (req, res, next) => {
  try {
    const payload = await new BlogService(req).findBlogList(
      req.query,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
