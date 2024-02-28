import AffiliateLinkService from 'src/modules/affiliateLink/affiliateLinkService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'AFFILIATE_LINK_VIEW';

const affiliateLinkViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: affiliateLinkViewActions.FIND_STARTED,
      });

      const record = await AffiliateLinkService.find(id);

      dispatch({
        type: affiliateLinkViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: affiliateLinkViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/affiliate-link');
    }
  },
};

export default affiliateLinkViewActions;
