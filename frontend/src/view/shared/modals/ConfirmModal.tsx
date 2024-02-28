import React from 'react';
import ReactDOM from 'react-dom';
import {
  Dialog,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';
import MDTypography from 'src/mui/components/MDTypography';

function ConfirmModal(props) {
  const { sidenavColor } = selectMuiSettings();
  return ReactDOM.createPortal(
    <Dialog
      open={true}
      onClose={props.onClose}
      maxWidth="xs"
      fullWidth={true}
    >
      <DialogTitle>
        <MDTypography>{props.title}</MDTypography>
      </DialogTitle>
      <DialogActions>
        <MDButton
          variant="outlined"
          onClick={props.onClose}
          color={sidenavColor}
          size="small"
        >
          {props.cancelText}
        </MDButton>
        <MDButton
          variant="gradient"
          onClick={props.onConfirm}
          color={sidenavColor}
          size="small"
          autoFocus
        >
          {props.okText}
        </MDButton>
      </DialogActions>
    </Dialog>,
    (document as any).getElementById('modal-root'),
  );
}

export default ConfirmModal;
