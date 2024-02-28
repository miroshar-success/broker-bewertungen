import { DEFAULT_MOMENT_FORMAT_DATE_ONLY } from 'src/config/common';
import { i18n } from 'src/i18n';
import { IconButton, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import actions from 'src/modules/blogComment/list/blogCommentListActions';
import blogCommentSelectors from 'src/modules/blogComment/blogCommentSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import commentDestroyActions from 'src/modules/blogComment/destroy/blogCommentDestroyActions';
import commentReviewActions from 'src/modules/blogComment/review/blogCommentReviewActions';
import commentSpamActions from 'src/modules/blogComment/spam/blogCommentSpamActions';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HtmlView from 'src/view/shared/view/HtmlView';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import PageContent from 'src/view/shared/view/PageContent';
import ReviewsIcon from '@mui/icons-material/Reviews';
import selectors from 'src/modules/blogComment/list/blogCommentListSelectors';
import Spinner from 'src/view/shared/Spinner';

function RecentComments() {
  const { sidenavColor } = selectMuiSettings();

  const dispatch = useDispatch();

  const [idToDestroy, setIdToDestroy] = useState(null);
  const [idToSpam, setIdToSpam] = useState(null);
  const [idToReview, setIdToReview] = useState(null);

  const [dispatched, setDispatched] = useState(false);

  const loading = useSelector(selectors.selectLoading);
  const hasRows = useSelector(selectors.selectHasRows);

  const rows = useSelector(selectors.selectRows);

  const hasPermissionToEdit = useSelector(
    blogCommentSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    blogCommentSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) => {
    setIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setIdToDestroy(null);
  };

  const doOpenSpamConfirmModal = (id) => {
    setIdToSpam(id);
  };

  const doCloseSpamConfirmModal = () => {
    setIdToSpam(null);
  };

  const doOpenReviewConfirmModal = (id) => {
    setIdToReview(id);
  };

  const doCloseReviewConfirmModal = () => {
    setIdToReview(null);
  };

  const redirectUrl = '/admin/dashboard';

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();
    dispatch(
      commentDestroyActions.doDestroy(id, redirectUrl),
    );
  };

  const doSpam = (id) => {
    doCloseSpamConfirmModal();
    dispatch(commentSpamActions.doSpam(id, redirectUrl));
  };

  const doReview = (id) => {
    doCloseReviewConfirmModal();
    dispatch(
      commentReviewActions.doReview(id, redirectUrl),
    );
  };

  useEffect(() => {
    dispatch(
      actions.doFetch({
        limit: 5,
        deleted: false,
      }),
    );
    setDispatched(true);
  }, []);

  return (
    <>
      <PageContent p={3}>
        <MDTypography variant="h4" mb={3}>
          {'Blog Comments'}
        </MDTypography>
        {loading && <Spinner />}
        {dispatched &&
          !loading &&
          hasRows &&
          rows.map((row) => (
            <MDBox key={row.id}>
              <MDBox
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <MDBox>
                  <MDTypography
                    variant="h5"
                    color="warning"
                  >
                    {row.name}
                  </MDTypography>
                  <MDTypography
                    variant="button"
                    fontWeight="bold"
                    color="info"
                  >
                    {`Verfasst am: ${moment(
                      row.modified,
                    ).format(
                      DEFAULT_MOMENT_FORMAT_DATE_ONLY,
                    )}`}
                  </MDTypography>
                </MDBox>
                <MDBox>
                  {hasPermissionToEdit && (
                    <Tooltip title={i18n('common.review')}>
                      <IconButton
                        size="small"
                        color={sidenavColor}
                        onClick={() =>
                          doOpenReviewConfirmModal(row.id)
                        }
                      >
                        <ReviewsIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasPermissionToDestroy && (
                    <Tooltip title={i18n('common.destroy')}>
                      <IconButton
                        size="small"
                        color={sidenavColor}
                        onClick={() =>
                          doOpenDestroyConfirmModal(row.id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {hasPermissionToEdit && (
                    <>
                      <Tooltip title={i18n('common.edit')}>
                        <IconButton
                          size="small"
                          color={sidenavColor}
                          component={Link}
                          to={`/admin/blog-comment/${row.id}/edit`}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title={i18n('common.spam')}>
                        <IconButton
                          size="small"
                          color={sidenavColor}
                          onClick={() =>
                            doOpenSpamConfirmModal(row.id)
                          }
                        >
                          <BugReportIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
                </MDBox>
              </MDBox>
              <MDBox
                color="text"
                fontSize="1rem"
                fontWeight="regular"
                mt={1}
                mb={3}
              >
                <HtmlView value={row.content} />
              </MDBox>
            </MDBox>
          ))}
        {!loading && !hasRows && (
          <MDTypography variant="body2">
            {i18n('common.noRecord')}
          </MDTypography>
        )}
      </PageContent>
      {idToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(idToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {idToSpam && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doSpam(idToSpam)}
          onClose={() => doCloseSpamConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {idToReview && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doReview(idToReview)}
          onClose={() => doCloseReviewConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default RecentComments;
