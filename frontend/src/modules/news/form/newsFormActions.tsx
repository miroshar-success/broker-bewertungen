import NewsService from 'src/modules/news/newsService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'NEWS_FORM';

const newsFormActions = {
  INIT_STARTED: `${prefix}_INIT_STARTED`,
  INIT_SUCCESS: `${prefix}_INIT_SUCCESS`,
  INIT_ERROR: `${prefix}_INIT_ERROR`,

  CREATE_STARTED: `${prefix}_CREATE_STARTED`,
  CREATE_SUCCESS: `${prefix}_CREATE_SUCCESS`,
  CREATE_ERROR: `${prefix}_CREATE_ERROR`,

  UPDATE_STARTED: `${prefix}_UPDATE_STARTED`,
  UPDATE_SUCCESS: `${prefix}_UPDATE_SUCCESS`,
  UPDATE_ERROR: `${prefix}_UPDATE_ERROR`,

  doInit: (id) => async (dispatch) => {
    try {
      dispatch({
        type: newsFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await NewsService.find(id);
      }

      dispatch({
        type: newsFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/news');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: newsFormActions.CREATE_STARTED,
      });

      await NewsService.create(values);

      dispatch({
        type: newsFormActions.CREATE_SUCCESS,
      });

      Message.success(i18n('entities.news.create.success'));

      getHistory().push('/admin/news');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: newsFormActions.UPDATE_STARTED,
      });

      await NewsService.update(id, values);

      dispatch({
        type: newsFormActions.UPDATE_SUCCESS,
      });

      Message.success(i18n('entities.news.update.success'));

      getHistory().push('/admin/news');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: newsFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default newsFormActions;
