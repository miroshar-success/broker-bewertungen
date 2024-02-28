import listActions from 'src/modules/author/list/authorListActions';
import AuthorService from 'src/modules/author/authorService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'AUTHOR_DESTROY';

const authorDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: authorDestroyActions.DESTROY_STARTED,
      });

      await AuthorService.destroyAll([id]);

      dispatch({
        type: authorDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.author.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/author');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: authorDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: authorDestroyActions.DESTROY_ALL_STARTED,
      });

      await AuthorService.destroyAll(ids);

      dispatch({
        type: authorDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.author.destroyAll.success'),
      );

      getHistory().push('/admin/author');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: authorDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default authorDestroyActions;
