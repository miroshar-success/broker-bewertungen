import ApiResponseHandler from '../apiResponseHandler';
import BrokerPostService from '../../services/brokerPostService';

export default async (req, res, next) => {
  try {
    const payload = await new BrokerPostService(
      req,
    ).findAndCountAll(req.query);

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
