import AffiliateLinkService from 'src/modules/affiliateLink/affiliateLinkService';
import Errors from 'src/modules/shared/error/errors';

const affiliateLinkHomeActions = {
  doRedirect: (url) => async () => {
    try {
      const record = await AffiliateLinkService.home(url);

      if (record) {
        window.location.href = record.link;
        return;
      }
    } catch (error) {
      Errors.handle(error);
    }
  },
};

export default affiliateLinkHomeActions;
