import Errors from 'src/modules/shared/error/errors';
import SitemapService from 'src/modules/sitemap/sitemapService';

const prefix = 'SITEMAP_ACTIONS';

const sitemapActions = {
  REFRESH_START: `${prefix}_REFRESH_START`,
  REFRESH_SUCCESS: `${prefix}_REFRESH_SUCCESS`,
  REFRESH_ERROR: `${prefix}_REFRESH_ERROR`,

  doRefresh: (recaptcha) => async (dispatch, getState) => {
    try {
      dispatch({
        type: sitemapActions.REFRESH_START,
      });

      await SitemapService.refresh(recaptcha);

      dispatch({
        type: sitemapActions.REFRESH_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);
      dispatch({
        type: sitemapActions.REFRESH_ERROR,
      });
    }
  },
};

export default sitemapActions;
