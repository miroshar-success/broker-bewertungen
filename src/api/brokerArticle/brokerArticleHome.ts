import ApiResponseHandler from '../apiResponseHandler';
import BrokerArticleService from '../../services/brokerArticleService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {
    const payload = await new BrokerArticleService(
      req,
    ).findByURL(req.body.url);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
