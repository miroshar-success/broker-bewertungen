import { useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';
import AuthorForm from 'src/view/author/form/AuthorForm';
import AuthorService from 'src/modules/author/authorService';
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

function AuthorFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      const { id } = await AuthorService.create(data);
      const record = await AuthorService.find(id);
      setSaveLoading(false);
      props.onSuccess(record);
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
            {i18n('entities.author.new.title')}
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
          <AuthorForm
            saveLoading={saveLoading}
            onSubmit={doSubmit}
            onCancel={doClose}
            modal
          />
        </MDBox>
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default AuthorFormModal;
