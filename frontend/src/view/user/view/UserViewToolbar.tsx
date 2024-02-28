import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { useSelector } from 'react-redux';
import userSelectors from 'src/modules/user/userSelectors';
import selectors from 'src/modules/user/view/userViewSelectors';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import { Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MDButton from 'src/mui/components/MDButton';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';

function UserViewToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const { match } = props;

  const user = useSelector(selectors.selectUser);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToEdit = useSelector(
    userSelectors.selectPermissionToEdit,
  );

  const id = match.params.id;

  return (
    <ToolbarWrapper>
      {hasPermissionToEdit && (
        <MDButton
          component={Link}
          to={`/admin/user/${id}/edit`}
          variant="gradient"
          color={sidenavColor}
          type="button"
          startIcon={<EditIcon />}
          size="small"
        >
          {i18n('common.edit')}
        </MDButton>
      )}

      {hasPermissionToAuditLogs && (
        <MDButton
          component={Link}
          to={`/admin/audit-logs?entityId=${encodeURIComponent(
            id,
          )}`}
          color={sidenavColor}
          variant="outlined"
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      {user && user.email && hasPermissionToAuditLogs && (
        <MDButton
          component={Link}
          type="button"
          color={sidenavColor}
          variant="outlined"
          to={`/admin/audit-logs?createdByEmail=${encodeURIComponent(
            user.email,
          )}`}
          startIcon={<VisibilityIcon />}
          size="small"
        >
          {i18n('user.view.activity')}
        </MDButton>
      )}
    </ToolbarWrapper>
  );
}

export default UserViewToolbar;
