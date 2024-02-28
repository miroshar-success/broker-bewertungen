import NavigationService from 'src/modules/navigation/navigationService';
import Errors from 'src/modules/shared/error/errors';

const prefix = 'NAVIGATION_MOST_READ';

const navigationMostReadActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  doFetch: () => async (dispatch, getState) => {
    try {
      dispatch({
        type: navigationMostReadActions.FETCH_STARTED,
      });

      const response = await NavigationService.mostRead();

      dispatch({
        type: navigationMostReadActions.FETCH_SUCCESS,
        payload: response,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: navigationMostReadActions.FETCH_ERROR,
      });
    }
  },
};

export default navigationMostReadActions;
