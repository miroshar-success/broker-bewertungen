import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import { Button, Tooltip } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import PauseIcon from '@mui/icons-material/Pause';
import AddIcon from '@mui/icons-material/Add';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

export default (
  selectors,
  actions,
  fields,
  templateHelp,
) => {
  function ImporterToolbar() {
    const dispatch = useDispatch();
    const { sidenavColor } = selectMuiSettings();
    const [resetConfirmVisible, setResetConfirmVisible] =
      useState(false);
    const [
      discardConfirmVisible,
      setDiscardConfirmVisible,
    ] = useState(false);

    const hasRows = useSelector(selectors.selectHasRows);
    const importing = useSelector(
      selectors.selectImporting,
    );
    const completed = useSelector(
      selectors.selectCompleted,
    );

    const doOpenResetConfirmModal = () => {
      setResetConfirmVisible(true);
    };

    const doCloseResetConfirmModal = () => {
      setResetConfirmVisible(false);
    };

    const doOpenDiscardConfirmModal = () => {
      setDiscardConfirmVisible(true);
    };

    const doCloseDiscardConfirmModal = () => {
      setDiscardConfirmVisible(false);
    };

    const doReset = () => {
      doCloseDiscardConfirmModal();
      doCloseResetConfirmModal();
      dispatch(actions.doReset());
    };

    const doPause = () => {
      dispatch(actions.doPause());
    };

    const doImport = () => {
      dispatch(actions.doImport());
    };

    const doDownloadTemplate = () => {
      dispatch(actions.doDownloadTemplate());
    };

    const showDownloadTemplate = !hasRows;
    const showImport = hasRows && !importing && !completed;
    const showDiscard = hasRows && !importing && !completed;
    const showNew = Boolean(completed);
    const showPause = hasRows && importing;

    return (
      <ToolbarWrapper>
        {showDownloadTemplate && (
          <>
            <MDButton
              variant="outlined"
              color={sidenavColor}
              type="button"
              onClick={doDownloadTemplate}
              startIcon={<DescriptionIcon />}
              size="small"
            >
              {i18n('importer.form.downloadTemplate')}
            </MDButton>

            {templateHelp && (
              <Tooltip
                style={{ marginLeft: '8px' }}
                title={templateHelp}
              >
                <InfoIcon />
              </Tooltip>
            )}
          </>
        )}

        {showImport && (
          <MDButton
            variant="gradient"
            color={sidenavColor}
            onClick={doImport}
            type="button"
            startIcon={<SaveIcon />}
            size="small"
          >
            {i18n('common.import')}
          </MDButton>
        )}

        {showPause && (
          <MDButton
            variant="outlined"
            color={sidenavColor}
            type="button"
            startIcon={<PauseIcon />}
            onClick={doPause}
            size="small"
          >
            {i18n('common.pause')}
          </MDButton>
        )}

        {showNew && (
          <MDButton
            variant="outlined"
            color={sidenavColor}
            type="button"
            startIcon={<AddIcon />}
            onClick={doOpenResetConfirmModal}
            size="small"
          >
            {i18n('common.new')}
          </MDButton>
        )}

        {showDiscard && (
          <MDButton
            variant="outlined"
            color={sidenavColor}
            type="button"
            startIcon={<DeleteIcon />}
            onClick={doOpenDiscardConfirmModal}
            size="small"
          >
            {i18n('common.discard')}
          </MDButton>
        )}

        {discardConfirmVisible && (
          <ConfirmModal
            title={i18n('importer.list.discardConfirm')}
            onConfirm={() => doReset()}
            onClose={() => doCloseDiscardConfirmModal()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}

        {resetConfirmVisible && (
          <ConfirmModal
            title={i18n('common.areYouSure')}
            onConfirm={() => doReset()}
            onClose={() => doCloseResetConfirmModal()}
            okText={i18n('common.yes')}
            cancelText={i18n('common.no')}
          />
        )}
      </ToolbarWrapper>
    );
  }

  return ImporterToolbar;
};
