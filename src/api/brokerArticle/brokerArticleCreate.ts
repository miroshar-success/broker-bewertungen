import ApiResponseHandler from '../apiResponseHandler';
import BrokerArticleService from '../../services/brokerArticleService';
import PermissionChecker from '../../services/user/permissionChecker';
import Permissions from '../../security/permissions';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.brokerArticleCreate,
    );

    const payload = await new BrokerArticleService(
      req,
    ).create({
      ...req.body.data,
      ip: req.ip,
    });

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
