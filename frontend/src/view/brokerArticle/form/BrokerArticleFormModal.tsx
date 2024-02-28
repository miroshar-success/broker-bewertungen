import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';
import BrokerArticleForm from 'src/view/brokerArticle/form/BrokerArticleForm';
import Errors from 'src/modules/shared/error/errors';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MDTypography from 'src/mui/components/MDTypography';
import MDBox from 'src/mui/components/MDBox';
import { useDispatch, useSelector } from 'react-redux';
import selectors from 'src/modules/brokerArticle/form/brokerArticleFormSelectors';
import Spinner from 'src/view/shared/Spinner';
import actions from 'src/modules/brokerArticle/form/brokerArticleFormActions';
import brokerArticleListActions from 'src/modules/brokerArticle/list/brokerArticleListActions';
import BrokerArticleService from 'src/modules/brokerArticle/brokerArticleService';
import Message from 'src/view/shared/message';

function BrokerArticleFormModal(props) {
  const initLoading = useSelector(
    selectors.selectInitLoading,
  );
  const [saveLoading, setSaveLoading] = useState(false);
  const [dispatched, setDispatched] = useState(false);
  const dispatch = useDispatch();

  const isEditing = Boolean(props.id);

  const record = useSelector(selectors.selectRecord);

  useEffect(() => {
    dispatch(actions.doInit(props.id));
    setDispatched(true);
  }, [dispatch, props.id]);

  const title = isEditing
    ? i18n('entities.brokerArticle.edit.title')
    : i18n('entities.brokerArticle.new.title');

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      if (isEditing) {
        await BrokerArticleService.update(props.id, {
          broker: props.broker || 0,
          ...data,
        });
        Message.success(
          i18n('entities.brokerArticle.update.success'),
        );
      } else {
        await BrokerArticleService.create({
          broker: props.broker || 0,
          ...data,
        });
        Message.success(
          i18n('entities.brokerArticle.create.success'),
        );
      }
      setSaveLoading(false);
      dispatch(
        brokerArticleListActions.doFetchCurrentFilter(),
      );
      props.onSuccess();
    } catch (error) {
      Errors.handle(error);
    } finally {
      setSaveLoading(false);
    }
  };

  const doClose = () => {
    return props.onClose();
  };

  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={doClose}
      maxWidth="lg"
      fullWidth={true}
    >
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography fontWeight="bold">
            {title}
          </MDTypography>
          <IconButton
            color="secondary"
            onClick={doClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </MDBox>
      </DialogTitle>
      <DialogContent>
        <MDBox p={3}>
          {initLoading && <Spinner />}
          {dispatched && !initLoading && (
            <BrokerArticleForm
              saveLoading={saveLoading}
              onSubmit={doSubmit}
              onCancel={doClose}
              record={record}
              modal
            />
          )}
        </MDBox>
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default BrokerArticleFormModal;
