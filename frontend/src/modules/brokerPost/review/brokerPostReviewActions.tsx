import listActions from 'src/modules/brokerPost/list/brokerPostListActions';
import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import Errors from 'src/modules/shared/error/errors';
import { i18n } from 'src/i18n';
import { getHistory } from 'src/modules/store';
import Message from 'src/view/shared/message';

const prefix = 'BROKER_POST_REVIEW';

const brokerPostReviewActions = {
  REVIEW_STARTED: `${prefix}_REVIEW_STARTED`,
  REVIEW_SUCCESS: `${prefix}_REVIEW_SUCCESS`,
  REVIEW_ERROR: `${prefix}_REVIEW_ERROR`,

  REVIEW_ALL_STARTED: `${prefix}_REVIEW_ALL_STARTED`,
  REVIEW_ALL_SUCCESS: `${prefix}_REVIEW_ALL_SUCCESS`,
  REVIEW_ALL_ERROR: `${prefix}_REVIEW_ALL_ERROR`,

  doReview:
    (id, redirect_url = '/admin/broker-post') =>
    async (dispatch) => {
      try {
        dispatch({
          type: brokerPostReviewActions.REVIEW_STARTED,
        });

        await BrokerPostService.reviewAll([id]);

        dispatch({
          type: brokerPostReviewActions.REVIEW_SUCCESS,
        });

        Message.success(
          i18n('entities.brokerPost.review.success'),
        );

        dispatch(listActions.doFetchCurrentFilter());

        getHistory().push(redirect_url);
      } catch (error) {
        Errors.handle(error);

        dispatch(listActions.doFetchCurrentFilter());

        dispatch({
          type: brokerPostReviewActions.REVIEW_ERROR,
        });
      }
    },

  doReviewAll: (ids) => async (dispatch) => {
    try {
      dispatch({
        type: brokerPostReviewActions.REVIEW_ALL_STARTED,
      });

      await BrokerPostService.reviewAll(ids);

      dispatch({
        type: brokerPostReviewActions.REVIEW_ALL_SUCCESS,
      });

      if (listActions) {
        dispatch(listActions.doClearAllSelected());
        dispatch(listActions.doFetchCurrentFilter());
      }

      Message.success(
        i18n('entities.brokerPost.reviewAll.success'),
      );

      getHistory().push('/admin/broker-post');
    } catch (error) {
      Errors.handle(error);

      dispatch(listActions.doFetchCurrentFilter());

      dispatch({
        type: brokerPostReviewActions.REVIEW_ALL_ERROR,
      });
    }
  },
};

export default brokerPostReviewActions;
