import {
  DEFAULT_MOMENT_FORMAT_DATE_ONLY,
  DEFAULT_MOMENT_FORMAT_TIME_ONLY,
} from 'src/config/common';
import { i18n } from 'src/i18n';
import { Link } from 'react-router-dom';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import actions from 'src/modules/brokerPost/list/brokerPostListActions';
import brokerPostSelectors from 'src/modules/brokerPost/brokerPostSelectors';
import BugReportIcon from '@mui/icons-material/BugReport';
import Checkbox from '@mui/material/Checkbox';
import ConfirmModal from 'src/view/shared/modals/ConfirmModal';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import DeleteIcon from '@mui/icons-material/Delete';
import destroyActions from 'src/modules/brokerPost/destroy/brokerPostDestroyActions';
import destroySelectors from 'src/modules/brokerPost/destroy/brokerPostDestroySelectors';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import HtmlView from 'src/view/shared/view/HtmlView';
import IconButton from '@mui/material/IconButton';
import MaterialLink from '@mui/material/Link';
import MDBadgeDot from 'src/mui/components/MDBadgeDot';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import RatingListItem from 'src/view/shared/table/RatingListItem';
import reviewActions from 'src/modules/brokerPost/review/brokerPostReviewActions';
import ReviewsIcon from '@mui/icons-material/Reviews';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/brokerPost/list/brokerPostListSelectors';
import spamActions from 'src/modules/brokerPost/spam/brokerPostSpamActions';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import FieldSetViewItem from 'src/view/shared/view/FieldSetViewItem';

function BrokerPostListTable(props) {
  const { sidenavColor } = selectMuiSettings();
  const [recordIdToDestroy, setRecordIdToDestroy] =
    useState(null);
  const [recordIdToSpam, setRecordIdToSpam] =
    useState(null);
  const [recordIdToReview, setRecordIdToReview] =
    useState(null);
  const dispatch = useDispatch();

  const findLoading = useSelector(selectors.selectLoading);

  const destroyLoading = useSelector(
    destroySelectors.selectLoading,
  );

  const loading = findLoading || destroyLoading;

  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const selectedKeys = useSelector(
    selectors.selectSelectedKeys,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);
  const isAllSelected = useSelector(
    selectors.selectIsAllSelected,
  );
  const hasPermissionToCreate = useSelector(
    brokerPostSelectors.selectPermissionToCreate,
  );
  const hasPermissionToEdit = useSelector(
    brokerPostSelectors.selectPermissionToEdit,
  );
  const hasPermissionToDestroy = useSelector(
    brokerPostSelectors.selectPermissionToDestroy,
  );

  const doOpenDestroyConfirmModal = (id) => {
    setRecordIdToDestroy(id);
  };

  const doCloseDestroyConfirmModal = () => {
    setRecordIdToDestroy(null);
  };

  const doOpenSpamConfirmModal = (id) => {
    setRecordIdToSpam(id);
  };

  const doCloseSpamConfirmModal = () => {
    setRecordIdToSpam(null);
  };

  const doOpenReviewConfirmModal = (id) => {
    setRecordIdToReview(id);
  };

  const doCloseReviewConfirmModal = () => {
    setRecordIdToReview(null);
  };

  const doChangeSort = (field) => {
    const order =
      sorter.field === field && sorter.order === 'asc'
        ? 'desc'
        : 'asc';

    dispatch(
      actions.doChangeSort({
        field,
        order,
      }),
    );
  };

  const doChangePagination = (pagination) => {
    dispatch(actions.doChangePagination(pagination));
  };

  const doDestroy = (id) => {
    doCloseDestroyConfirmModal();

    dispatch(destroyActions.doDestroy(id));
  };

  const doSpam = (id) => {
    doCloseSpamConfirmModal();

    dispatch(spamActions.doSpam(id));
  };

  const doReview = (id) => {
    doCloseReviewConfirmModal();

    dispatch(reviewActions.doReview(id));
  };

  const doToggleAllSelected = () => {
    dispatch(actions.doToggleAllSelected());
  };

  const doToggleOneSelected = (id) => {
    dispatch(actions.doToggleOneSelected(id));
  };

  const RenderRow = ({ row }) => (
    <>
      <TableRow>
        <DataTableBodyCell padding="checkbox">
          <Checkbox
            color={sidenavColor}
            checked={selectedKeys.includes(row.id)}
            onChange={() => doToggleOneSelected(row.id)}
            size="small"
          />
        </DataTableBodyCell>
        <DataTableBodyCell>
          <MaterialLink
            component={Link}
            to={
              '/erfahrungsberichte/' +
              (row.broker?.name_normalized ?? '')
            }
          >
            {row.broker?.name}
          </MaterialLink>
        </DataTableBodyCell>
        <DataTableBodyCell>{row.name}</DataTableBodyCell>
        <DataTableBodyCell>
          <RatingListItem value={row.rating} />
        </DataTableBodyCell>
        <DataTableBodyCell>
          {moment(row.created).format(
            DEFAULT_MOMENT_FORMAT_DATE_ONLY,
          )}
          <br />
          {moment(row.created).format(
            DEFAULT_MOMENT_FORMAT_TIME_ONLY,
          )}
        </DataTableBodyCell>
        <DataTableBodyCell>
          {['deleted', 'spam', 'review_required'].map(
            (field) => (
              <MDBadgeDot
                key={field}
                width="max-content"
                badgeContent={i18n(
                  `entities.brokerPost.fields.${field}`,
                )}
                color={
                  Boolean(row[field]) ? 'info' : 'error'
                }
                variant="contained"
                container
              />
            ),
          )}
        </DataTableBodyCell>
        <DataTableBodyCell>
          <MDBox display="flex" justifyContent="flex-end">
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
            {!Boolean(row.parent_id) &&
              hasPermissionToCreate && (
                <Tooltip
                  title={i18n('common.writeComment')}
                >
                  <IconButton
                    size="small"
                    color={sidenavColor}
                    component={Link}
                    to={`/admin/broker-post/new/${row.id}`}
                  >
                    <EmailIcon />
                  </IconButton>
                </Tooltip>
              )}
            <Tooltip title={i18n('common.view')}>
              <IconButton
                size="small"
                component={Link}
                color={sidenavColor}
                to={`/admin/broker-post/${row.id}`}
              >
                <SearchIcon />
              </IconButton>
            </Tooltip>
            {hasPermissionToEdit && (
              <>
                <Tooltip title={i18n('common.edit')}>
                  <IconButton
                    size="small"
                    color={sidenavColor}
                    component={Link}
                    to={`/admin/broker-post/${row.id}/edit`}
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
        </DataTableBodyCell>
      </TableRow>
      <TableRow>
        <DataTableBodyCell colSpan={3}> </DataTableBodyCell>
        <DataTableBodyCell colSpan={100} width="100%">
          <HtmlView value={row.review} />
          {row.children && row.children.length > 0 && (
            <MDBox
              width="100%"
              sx={{
                '& > * + *': {
                  mt: 2,
                },
              }}
            >
              {row.children.map((subPost) => (
                <FieldSetViewItem key={subPost.id}>
                  <MDBox
                    mb={2}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <MDTypography
                      variant="body1"
                      fontWeight="regular"
                    >
                      Kommentar von: {subPost.name}
                    </MDTypography>
                    <MDBox
                      display="flex"
                      alignItems="center"
                    >
                      <MDBox>
                        {['deleted'].map((field) => (
                          <MDBadgeDot
                            key={field}
                            width="max-content"
                            badgeContent={i18n(
                              `entities.brokerPost.fields.${field}`,
                            )}
                            color={
                              Boolean(subPost[field])
                                ? 'info'
                                : 'error'
                            }
                            variant="contained"
                            container
                          />
                        ))}
                      </MDBox>
                      {hasPermissionToDestroy && (
                        <Tooltip
                          title={i18n('common.destroy')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            onClick={() =>
                              doOpenDestroyConfirmModal(
                                subPost.id,
                              )
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      {hasPermissionToEdit && (
                        <Tooltip
                          title={i18n('common.edit')}
                        >
                          <IconButton
                            size="small"
                            color={sidenavColor}
                            component={Link}
                            to={`/admin/broker-post/${subPost.id}/edit`}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                    </MDBox>
                  </MDBox>
                  <MDBox>
                    <HtmlView value={subPost.review} />
                  </MDBox>
                </FieldSetViewItem>
              ))}
            </MDBox>
          )}
        </DataTableBodyCell>
      </TableRow>
    </>
  );

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell
                padding="checkbox"
                width="0"
                sorted={false}
              >
                {hasRows && (
                  <Checkbox
                    color={sidenavColor}
                    checked={Boolean(isAllSelected)}
                    onChange={() => doToggleAllSelected()}
                    size="small"
                  />
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false}>
                {i18n('entities.brokerPost.fields.broker')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('name')}
                sorted={
                  sorter.field === 'name'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.brokerPost.fields.name')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('rating')}
                sorted={
                  sorter.field === 'rating'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.brokerPost.fields.rating')}
              </DataTableHeadCell>
              <DataTableHeadCell
                onClick={() => doChangeSort('created')}
                sorted={
                  sorter.field === 'created'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('entities.brokerPost.fields.created')}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {i18n(
                  'entities.brokerPost.fields.activated',
                )}
              </DataTableHeadCell>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>
            </TableRow>
          </MDBox>
          <TableBody>
            {loading && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <Spinner />
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading && !hasRows && (
              <TableRow>
                <DataTableBodyCell
                  align="center"
                  colSpan={100}
                >
                  <MDTypography align="center">
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <RenderRow key={row.id} row={row} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        onChange={doChangePagination}
        disabled={loading}
        pagination={pagination}
        entriesPerPage
        showTotalEntries
      />

      {recordIdToDestroy && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doDestroy(recordIdToDestroy)}
          onClose={() => doCloseDestroyConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {recordIdToSpam && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doSpam(recordIdToSpam)}
          onClose={() => doCloseSpamConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
      {recordIdToReview && (
        <ConfirmModal
          title={i18n('common.areYouSure')}
          onConfirm={() => doReview(recordIdToReview)}
          onClose={() => doCloseReviewConfirmModal()}
          okText={i18n('common.yes')}
          cancelText={i18n('common.no')}
        />
      )}
    </>
  );
}

export default BrokerPostListTable;
