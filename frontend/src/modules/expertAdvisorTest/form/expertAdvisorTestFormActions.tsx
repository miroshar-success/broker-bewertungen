import ExpertAdvisorTestService from 'src/modules/expertAdvisorTest/expertAdvisorTestService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';

const prefix = 'EXPERT_ADVISOR_TEST_FORM';

const expertAdvisorTestFormActions = {
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
        type: expertAdvisorTestFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await ExpertAdvisorTestService.find(id);
      }

      dispatch({
        type: expertAdvisorTestFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: expertAdvisorTestFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/expert-advisor-test');
    }
  },

  doCreate: (values) => async (dispatch) => {
    try {
      dispatch({
        type: expertAdvisorTestFormActions.CREATE_STARTED,
      });

      await ExpertAdvisorTestService.create(values);

      dispatch({
        type: expertAdvisorTestFormActions.CREATE_SUCCESS,
      });

      Message.success(
        i18n('entities.expertAdvisorTest.create.success'),
      );

      getHistory().push('/admin/expert-advisor-test');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: expertAdvisorTestFormActions.CREATE_ERROR,
      });
    }
  },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: expertAdvisorTestFormActions.UPDATE_STARTED,
      });

      await ExpertAdvisorTestService.update(id, values);

      dispatch({
        type: expertAdvisorTestFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.expertAdvisorTest.update.success'),
      );

      getHistory().push('/admin/expert-advisor-test');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: expertAdvisorTestFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default expertAdvisorTestFormActions;
