import { useState } from 'react';
import ReactDOM from 'react-dom';
import { i18n } from 'src/i18n';
import UserNewForm from 'src/view/user/new/UserNewForm';
import Errors from 'src/modules/shared/error/errors';
import UserService from 'src/modules/user/userService';
import {
  DialogTitle,
  DialogContent,
  Dialog,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';

function UserNewFormModal(props) {
  const [saveLoading, setSaveLoading] = useState(false);

  const doSubmit = async (_, data) => {
    try {
      setSaveLoading(true);
      await UserService.create(data);

      const { rows } = await UserService.fetchUsers(
        {
          email: data.emails[0],
        },
        null,
        1,
        0,
      );
      setSaveLoading(false);
      props.onSuccess(rows[0]);
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
      maxWidth="md"
      fullWidth={true}
    >
      <DialogTitle>
        <MDBox
          display="flex"
          justifyContent="space-between"
        >
          <MDTypography>
            {i18n('user.new.titleModal')}
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
        <UserNewForm
          saveLoading={saveLoading}
          onSubmit={doSubmit}
          onCancel={doClose}
          modal
          single
        />
      </DialogContent>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default UserNewFormModal;
