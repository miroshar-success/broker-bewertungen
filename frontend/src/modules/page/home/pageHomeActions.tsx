import Errors from 'src/modules/shared/error/errors';
import PageService from 'src/modules/page/pageService';
import brokerArticleHomeActions from 'src/modules/brokerArticle/home/brokerArticleHomeActions';

const prefix = 'PAGE_HOME';

const pageHomeActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (url) => async (dispatch) => {
    try {
      dispatch({
        type: pageHomeActions.FIND_STARTED,
      });

      let record = await PageService.findByURL(url);

      if (record === '') {
        record = null;
        dispatch(brokerArticleHomeActions.doFind(url));
      }

      if (record?.downloadPdf) {
        window.location.href = record.downloadUrl;
      }

      dispatch({
        type: pageHomeActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: pageHomeActions.FIND_ERROR,
      });
    }
  },

  doDownload: (url) => async (dispatch) => {
    try {
      const record = await PageService.findByURL(url);
      if (record?.downloadPdf) {
        window.location.href = record.downloadUrl;
      }
    } catch (error) {
      Errors.handle(error);
    }
  },
};

export default pageHomeActions;
