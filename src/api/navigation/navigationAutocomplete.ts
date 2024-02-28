import PermissionChecker from '../../services/user/permissionChecker';
import ApiResponseHandler from '../apiResponseHandler';
import Permissions from '../../security/permissions';
import NavigationService from '../../services/navigationService';

export default async (req, res, next) => {
  try {
    new PermissionChecker(req).validateHas(
      Permissions.values.navigationAutocomplete,
    );

    const children =
      req.query.withChildren === undefined ||
      req.query.withChildren === null
        ? false
        : req.query.withChildren
            .toString()
            .toLowerCase() === 'true';

    const payload = await new NavigationService(
      req,
    ).findAllAutocomplete(
      req.query.query,
      req.query.limit,
      children,
      req.query.part,
      req.query.id,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
