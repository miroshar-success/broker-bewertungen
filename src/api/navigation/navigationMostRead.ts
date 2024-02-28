import ApiResponseHandler from '../apiResponseHandler';
import NavigationService from '../../services/navigationService';

export default async (req, res, next) => {
  try {
    const payload = await new NavigationService(
      req,
    ).findAndCountAll({
      filter: {
        type: 'MOST_READ',
        activated: true,
      },
      orderBy: 'sort_asc',
    });

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
