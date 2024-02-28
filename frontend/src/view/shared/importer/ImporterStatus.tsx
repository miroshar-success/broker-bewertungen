import React from 'react';
import { useSelector } from 'react-redux';
import { i18n } from 'src/i18n';
import ImporterStatusWrapper from 'src/view/shared/importer/styles/ImporterStatusWrapper';
import { LinearProgress } from '@mui/material';

import { red, green, orange } from '@mui/material/colors';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import MDProgress from 'src/mui/components/MDProgress';
import MDTypography from 'src/mui/components/MDTypography';

export default (selectors) => {
  function ImporterStatus() {
    const { sidenavColor } = selectMuiSettings();
    const completed = useSelector(
      selectors.selectCompleted,
    );
    const importing = useSelector(
      selectors.selectImporting,
    );
    const nonPendingRowsCount = useSelector(
      selectors.selectNonPendingRowsCount,
    );
    const rowsCount = useSelector(
      selectors.selectRowsCount,
    );
    const percent: number = useSelector(
      selectors.selectPercent,
    );
    const errorRowsCount = useSelector(
      selectors.selectErrorRowsCount,
    );

    const renderCompleted = () => {
      return (
        <MDTypography variant="h6" color="success">
          {i18n('importer.completed.success')}
        </MDTypography>
      );
    };

    const renderCompletedSomeErrors = () => {
      return (
        <MDTypography variant="h6" color="warning">
          {i18n('importer.completed.someErrors')}
        </MDTypography>
      );
    };

    const renderCompletedAllErrors = () => {
      return (
        <MDTypography variant="h6" color="error">
          {i18n('importer.completed.allErrors')}
        </MDTypography>
      );
    };

    const renderProcessing = () => {
      return (
        <>
          <MDProgress
            color={sidenavColor}
            variant="contained"
            value={percent}
          />
          <MDTypography variant="h6">
            {i18n(
              'importer.importedMessage',
              nonPendingRowsCount,
              rowsCount,
            )}{' '}
            {i18n('importer.noNavigateAwayMessage')}
          </MDTypography>
        </>
      );
    };

    const renderBody = () => {
      const isAllErrors = errorRowsCount === rowsCount;

      if (completed && isAllErrors) {
        return renderCompletedAllErrors();
      }

      const isSomeErrors = Boolean(errorRowsCount);

      if (completed && isSomeErrors) {
        return renderCompletedSomeErrors();
      }

      const allSuccess = !errorRowsCount;

      if (completed && allSuccess) {
        return renderCompleted();
      }

      return renderProcessing();
    };

    if (!importing && !completed) {
      return null;
    }

    return (
      <ImporterStatusWrapper>
        {renderBody()}
      </ImporterStatusWrapper>
    );
  }

  return ImporterStatus;
};
