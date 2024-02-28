import React from 'react';
import PropTypes from 'prop-types';
import { i18n } from 'src/i18n';
import statuses from 'src/modules/shared/importer/importerStatuses';
import ImporterErrorStatusMessage from 'src/view/shared/importer/styles/ImporterErrorStatusMessage';
import ColoredChip from 'src/view/shared/ColoredChip';
import MDBadge from 'src/mui/components/MDBadge';

function ImporterRowStatus(props) {
  const { value, errorMessage } = props;

  if (value === statuses.PENDING) {
    return (
      <MDBadge
        variant="contained"
        color="secondary"
        badgeContent={i18n('importer.pending')}
        container
      />
    );
  }

  if (value === statuses.IMPORTED) {
    return (
      <MDBadge
        variant="contained"
        color="success"
        badgeContent={i18n('importer.imported')}
        container
      />
    );
  }

  if (value === statuses.ERROR) {
    return (
      <>
        <MDBadge
          variant="contained"
          color="error"
          badgeContent={i18n('importer.error')}
          container
        />{' '}
        <ImporterErrorStatusMessage>
          {errorMessage}
        </ImporterErrorStatusMessage>
      </>
    );
  }

  return null;
}

ImporterRowStatus.propTypes = {
  value: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
};

export default ImporterRowStatus;
