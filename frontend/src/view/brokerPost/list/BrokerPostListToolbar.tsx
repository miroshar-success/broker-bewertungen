import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { Tooltip } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/brokerPost/list/brokerPostListActions';
import AddIcon from '@mui/icons-material/Add';
import auditLogSelectors from 'src/modules/auditLog/auditLogSelectors';
import brokerPostSelectors from 'src/modules/brokerPost/brokerPostSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import DescriptionIcon from '@mui/icons-material/Description';
import destroyActions from 'src/modules/brokerPost/destroy/brokerPostDestroyActions';
import destroySelectors from 'src/modules/brokerPost/destroy/brokerPostDestroySelectors';
import HistoryIcon from '@mui/icons-material/History';
import MDButton from 'src/mui/components/MDButton';
import reviewActions from 'src/modules/brokerPost/review/brokerPostReviewActions';
import reviewSelectors from 'src/modules/brokerPost/review/brokerPostReviewSelectors';
import ReviewsIcon from '@mui/icons-material/Reviews';
import selectors from 'src/modules/brokerPost/list/brokerPostListSelectors';
import spamActions from 'src/modules/brokerPost/spam/brokerPostSpamActions';
import spamSelectors from 'src/modules/brokerPost/spam/brokerPostSpamSelectors';
import ToolbarWrapper from 'src/view/shared/styles/ToolbarWrapper';

function BrokerPostToolbar(props) {
  const { sidenavColor } = selectMuiSettings();
  const [
    destroyAllConfirmVisible,
    setDestroyAllConfirmVisible,
  ] = useState(false);
  const [
    reviewAllConfirmVisible,
    setReviewAllConfirmVisible,
  ] = useState(false);
  const [spamAllConfirmVisible, setSpamAllConfirmVisible] =
    useState(false);

  const dispatch = useDispatch();

  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const loading = useSelector(selectors.selectLoading);
  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );
  const reviewLoading = useSelector(
    reviewSelectors.selectLoading,
  );
  const spamLoading = useSelector(
    spamSelectors.selectLoading,
  );
  const exportLoading = useSelector(
    selectors.selectExportLoading,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const hasPermissionToAuditLogs = useSelector(
    auditLogSelectors.selectPermissionToRead,
  );
  const hasPermissionToDestroy = useSelector(
    brokerPostSelectors.selectPermissionToDestroy,
  );
  const hasPermissionToCreate = useSelector(
    brokerPostSelectors.selectPermissionToCreate,
  );
  const hasPermissionToEdit = useSelector(
    brokerPostSelectors.selectPermissionToEdit,
  );
  const hasPermissionToImport = useSelector(
    brokerPostSelectors.selectPermissionToImport,
  );

  const doOpenDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(true);
  };

  const doCloseDestroyAllConfirmModal = () => {
    setDestroyAllConfirmVisible(false);
  };

  const doOpenReviewAllConfirmModal = () => {
    setReviewAllConfirmVisible(true);
  };

  const doCloseReviewAllConfirmModal = () => {
    setReviewAllConfirmVisible(false);
  };

  const doOpenSpamAllConfirmModal = () => {
    setSpamAllConfirmVisible(true);
  };

  const doCloseSpamAllConfirmModal = () => {
    setSpamAllConfirmVisible(false);
  };

  const doExport = () => {
    dispatch(actions.doExport());
  };

  const doDestroyAllSelected = () => {
    doCloseDestroyAllConfirmModal();

    dispatch(destroyActions.doDestroyAll(selectedKeys));
  };

  const doReviewAllSelected = () => {
    doCloseReviewAllConfirmModal();

    dispatch(reviewActions.doReviewAll(selectedKeys));
  };

  const doSpamAllSelected = () => {
    doCloseSpamAllConfirmModal();

    dispatch(spamActions.doSpamAll(selectedKeys));
  };

  const renderExportButton = () => {
    const disabledWithTooltip = !hasRows || loading;

    const button = (
      <MDButton
        variant="outlined"
        color={sidenavColor}
        type="button"
        disabled={disabledWithTooltip || exportLoading}
        onClick={doExport}
        startIcon={<DescriptionIcon />}
        size="small"
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

  const renderDestroyButton = () => {
    if (!hasPermissionToEdit) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="gradient"
        color={sidenavColor}
        type="button"
        disabled={destroyLoading || disabled}
        onClick={doOpenDestroyAllConfirmModal}
        startIcon={<DeleteIcon />}
        size="small"
      >
        {i18n('common.destroy')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  const renderReviewButton = () => {
    if (!hasPermissionToEdit) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="gradient"
        color={sidenavColor}
        type="button"
        disabled={reviewLoading || disabled}
        onClick={doOpenReviewAllConfirmModal}
        startIcon={<ReviewsIcon />}
        size="small"
      >
        {i18n('common.review')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  const renderSpamButton = () => {
    if (!hasPermissionToEdit) {
      return null;
    }

    const disabled = !selectedKeys.length || loading;

    const button = (
      <MDButton
        variant="gradient"
        color={sidenavColor}
        type="button"
        disabled={spamLoading || disabled}
        onClick={doOpenSpamAllConfirmModal}
        startIcon={<BugReportIcon />}
        size="small"
      >
        {i18n('common.spam')}
      </MDButton>
    );

    if (disabled) {
      return (
        <Tooltip title={i18n('common.mustSelectARow')}>
          <span>{button}</span>
        </Tooltip>
      );
    }

    return button;
  };

  return (
    <ToolbarWrapper>
      {/* {hasPermissionToCreate && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          component={Link}
          to="/admin/broker-post/new"
          startIcon={<AddIcon />}
          size="small"
        >
          {i18n('common.new')}
        </MDButton>
      )} */}

      {hasPermissionToImport && (
        <MDButton
          variant="gradient"
          color={sidenavColor}
          component={Link}
          to="/admin/broker-post/importer"
          startIcon={<CloudUploadIcon />}
          size="small"
        >
          {i18n('common.import')}
        </MDButton>
      )}

      {renderSpamButton()}
      {renderReviewButton()}
      {renderDestroyButton()}

      {hasPermissionToAuditLogs && (
        <MDButton
          variant="outlined"
          color={sidenavColor}
          component={Link}
          to="/admin/audit-logs?entityNames=broker_post"
          startIcon={<HistoryIcon />}
          size="small"
        >
          {i18n('auditLog.menu')}
        </MDButton>
      )}

      {renderExportButton()}

      {destroyAllConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroyAllSelected()}
          onClose={() => doCloseDestroyAllConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {reviewAllConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doReviewAllSelected()}
          onClose={() => doCloseReviewAllConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {spamAllConfirmVisible && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doSpamAllSelected()}
          onClose={() => doCloseSpamAllConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </ToolbarWrapper>
  );
}

export default BrokerPostToolbar;
