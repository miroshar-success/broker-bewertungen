import React from 'react';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector, useDispatch } from 'react-redux';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import actions from 'src/modules/auditLog/auditLogActions';
import { i18n } from 'src/i18n';
import { Tooltip, Button } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function AuditLogToolbar(props) {
  const loading = useSelector(selectors.selectLoading);
  const { sidenavColor } = selectMuiSettings();
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const dispatch = useDispatch();

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const renderExportButton = () => {
    const disabledWithTooltip = !hasRows || loading;

    const button = (
      <MDButton
        variant="outlined"
        color={sidenavColor}
        size="small"
        type="button"
        disabled={disabledWithTooltip || exportLoading}
        onClick={doExport}
        startIcon={<DescriptionIcon />}
      >
        {i18n('common.export')}
      </MDButton>
    );

    if (!disabledWithTooltip) {
      return button;
    }

    return (
      <>
        <Tooltip title={i18n('common.noDataToExport')}>
          <span>{button}</span>
        </Tooltip>
      </>
    );
  };

  return (
    <ToolbarWrapper>{renderExportButton()}</ToolbarWrapper>
  );
}

export default AuditLogToolbar;
