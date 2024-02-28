import Errors from 'src/modules/shared/error/errors';
import { getHistory } from 'src/modules/store';
import UserService from 'src/modules/user/userService';

const prefix = 'USER_VIEW';

const userViewActions = {
  FIND_STARTED: `${prefix}_FIND_STARTED`,
  FIND_SUCCESS: `${prefix}_FIND_SUCCESS`,
  FIND_ERROR: `${prefix}_FIND_ERROR`,

  doFind: (id) => async (dispatch) => {
    try {
      dispatch({
        type: userViewActions.FIND_STARTED,
      });

      const user = await UserService.find(id);

      dispatch({
        type: userViewActions.FIND_SUCCESS,
        payload: user,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: userViewActions.FIND_ERROR,
      });

      getHistory().push('/admin/user');
    }
  },
};

export default userViewActions;
