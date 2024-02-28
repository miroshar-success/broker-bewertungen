import ExpertAdvisorTestService from 'src/modules/expertAdvisorTest/expertAdvisorTestService';
import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';

const prefix = 'EXPERT_ADVISOR_TEST_VIEW';

const expertAdvisorTestViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: expertAdvisorTestViewActions.FIND_STARTED,
      });

      const record = await ExpertAdvisorTestService.find(
        id,
      );

      dispatch({
        type: expertAdvisorTestViewActions.FIND_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: expertAdvisorTestViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/general-expertAdvisorTest');
    }
  },
};

export default expertAdvisorTestViewActions;
