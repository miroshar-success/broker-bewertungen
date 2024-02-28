import ApiResponseHandler from '../apiResponseHandler';
import BrokerService from '../../services/brokerService';

export default async (req, res, next) => {
  try {
    const payload = await new BrokerService(
      req,
    ).findAllAutocomplete(
      req.query.query,
      req.query.limit,
      req.query.useLink,
    );

    await ApiResponseHandler.success(req, res, payload);
  } catch (error) {
    await ApiResponseHandler.error(req, res, error);
  }
};
