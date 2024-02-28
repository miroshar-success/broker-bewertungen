import BrokerPostService from 'src/modules/brokerPost/brokerPostService';
import Errors from 'src/modules/shared/error/errors';
import Message from 'src/view/shared/message';
import { getHistory } from 'src/modules/store';
import { i18n } from 'src/i18n';
import parse from 'html-react-parser';
import MDBox from 'src/mui/components/MDBox';

const prefix = 'BROKER_POST_FORM';

const brokerPostFormActions = {
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
        type: brokerPostFormActions.INIT_STARTED,
      });

      let record = {};

      const isEdit = Boolean(id);

      if (isEdit) {
        record = await BrokerPostService.find(id);
      }

      dispatch({
        type: brokerPostFormActions.INIT_SUCCESS,
        payload: record,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerPostFormActions.INIT_ERROR,
      });

      getHistory().push('/admin/broker-post');
    }
  },

  doCreate:
    (values, brokerName = null, fnSuccess = null) =>
    async (dispatch) => {
      try {
        dispatch({
          type: brokerPostFormActions.CREATE_STARTED,
        });

        await BrokerPostService.create(values);

        dispatch({
          type: brokerPostFormActions.CREATE_SUCCESS,
        });

        if (values.parent_id) {
          Message.success(
            i18n('entities.brokerPost.create.comment'),
          );
          getHistory().push('/admin/broker-post');
        } else {
          Message.success(
            <MDBox color="inherit" width="50vw">
              {parse(
                i18n(
                  'entities.brokerPost.create.success',
                  brokerName,
                ),
              )}
            </MDBox>,
            20000,
          );
        }

        fnSuccess && fnSuccess();
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: brokerPostFormActions.CREATE_ERROR,
        });
      }
    },

  doUpdate: (id, values) => async (dispatch, getState) => {
    try {
      dispatch({
        type: brokerPostFormActions.UPDATE_STARTED,
      });

      await BrokerPostService.update(id, values);

      dispatch({
        type: brokerPostFormActions.UPDATE_SUCCESS,
      });

      Message.success(
        i18n('entities.brokerPost.update.success'),
      );

      getHistory().push('/admin/broker-post');
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: brokerPostFormActions.UPDATE_ERROR,
      });
    }
  },
};

export default brokerPostFormActions;
