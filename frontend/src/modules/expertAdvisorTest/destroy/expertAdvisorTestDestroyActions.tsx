import listActions from 'src/modules/expertAdvisorTest/list/expertAdvisorTestListActions';
import ExpertAdvisorTestService from 'src/modules/expertAdvisorTest/expertAdvisorTestService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'EXPERT_ADVISOR_TEST_DESTROY';

const expertAdvisorTestDestroyActions = {
  DESTROY_STARTED: `${prefix}_DESTROY_STARTED`,
  DESTROY_SUCCESS: `${prefix}_DESTROY_SUCCESS`,
  DESTROY_ERROR: `${prefix}_DESTROY_ERROR`,

  DESTROY_ALL_STARTED: `${prefix}_DESTROY_ALL_STARTED`,
  DESTROY_ALL_SUCCESS: `${prefix}_DESTROY_ALL_SUCCESS`,
  DESTROY_ALL_ERROR: `${prefix}_DESTROY_ALL_ERROR`,

  doDestroy: (id) => async (dispatch) => {
    try {
      dispatch({
        type: expertAdvisorTestDestroyActions.DESTROY_STARTED,
      });

      await ExpertAdvisorTestService.destroyAll([id]);

      dispatch({
        type: expertAdvisorTestDestroyActions.DESTROY_SUCCESS,
      });

      Message.success(
        i18n('entities.expertAdvisorTest.destroy.success'),
      );

      dispatch(listActions.doFetchCurrentFilter());

      getHistory().push('/admin/expert-advisor-test');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: expertAdvisorTestDestroyActions.DESTROY_ERROR,
      });
    }
  },

  doDestroyAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: expertAdvisorTestDestroyActions.DESTROY_ALL_STARTED,
      });

      await ExpertAdvisorTestService.destroyAll(ids);

      dispatch({
        type: expertAdvisorTestDestroyActions.DESTROY_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n(
          'entities.expertAdvisorTest.destroyAll.success',
        ),
      );

      getHistory().push('/admin/expert-advisor-test');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: expertAdvisorTestDestroyActions.DESTROY_ALL_ERROR,
      });
    }
  },
};

export default expertAdvisorTestDestroyActions;
