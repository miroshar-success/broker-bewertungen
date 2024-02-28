import FileStorage from '../../../services/file/fileStorage';
import ApiResponseHandler from '../../apiResponseHandler';

/**
 * Download a file from localhost.
 */
export default async (req, res, next) => {
  try {
    const privateUrl = req.query.privateUrl;

    if (!privateUrl) {
      return ApiResponseHandler.error(req, res, {
        code: '404',
      });
    }

    res.removeHeader('Cross-Origin-Resource-Policy');
    res.removeHeader('Cross-Origin-Embedder-Policy');

    await ApiResponseHandler.download(
      req,
      res,
      await FileStorage.download(privateUrl),
    );
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
