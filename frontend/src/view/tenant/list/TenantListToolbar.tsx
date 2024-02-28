import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { Link } from 'react-router-dom';
import { i18n } from 'src/i18n';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDButton from 'src/mui/components/MDButton';

function TenantToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  return (
    <ToolbarWrapper>
      <MDButton
        variant="gradient"
        color={sidenavColor}
        component={Link}
        to="/admin/tenant/new"
        startIcon={<AddIcon />}
        size="small"
      >
        {i18n('common.new')}
      </MDButton>
    </ToolbarWrapper>
  );
}

export default TenantToolbar;
