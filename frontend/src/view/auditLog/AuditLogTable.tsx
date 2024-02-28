import { DEFAULT_MOMENT_FORMAT } from 'src/config/common';
import { i18n } from 'src/i18n';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import { TableContainer } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import actions from 'src/modules/auditLog/auditLogActions';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';
import IconButton from '@mui/material/IconButton';
import MDBox from 'src/mui/components/MDBox';
import MDTypography from 'src/mui/components/MDTypography';
import moment from 'moment';
import Pagination from 'src/view/shared/table/Pagination';
import SearchIcon from '@mui/icons-material/Search';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import Spinner from 'src/view/shared/Spinner';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';

function AuditLogTable(props) {
  const dispatch = useDispatch();
  const { sidenavColor } = selectMuiSettings();

  const doOpenSelectdValues = (values) => {
    const data = JSON.stringify(
      typeof values === 'string'
        ? JSON.parse(values)
        : values,
      null,
      2,
    );
    const jsonWindow = (window as any).open(
      '',
      '_blank',
      'toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=400,height=400',
    );
    jsonWindow.document.write(`<pre>${data}</pre>`);
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

  const loading = useSelector(selectors.selectLoading);
  const rows = useSelector(selectors.selectRows);
  const pagination = useSelector(
    selectors.selectPagination,
  );
  const hasRows = useSelector(selectors.selectHasRows);
  const sorter = useSelector(selectors.selectSorter);

  return (
    <>
      <TableContainer sx={{ boxShadow: 'none' }}>
        <Table>
          <MDBox component="thead">
            <TableRow>
              <DataTableHeadCell sorted={false} width="0">
                {' '}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('timestamp')}
                sorted={
                  sorter.field === 'timestamp'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.timestamp')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() =>
                  doChangeSort('createdByEmail')
                }
                sorted={
                  sorter.field === 'createdByEmail'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.createdByEmail')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('entityName')}
                sorted={
                  sorter.field === 'entityName'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.entityName')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('action')}
                sorted={
                  sorter.field === 'action'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.action')}
              </DataTableHeadCell>

              <DataTableHeadCell
                onClick={() => doChangeSort('entityId')}
                sorted={
                  sorter.field === 'entityId'
                    ? sorter.order
                    : 'none'
                }
              >
                {i18n('auditLog.fields.entityId')}
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
                  <MDTypography>
                    {i18n('table.noData')}
                  </MDTypography>
                </DataTableBodyCell>
              </TableRow>
            )}
            {!loading &&
              rows.map((row) => (
                <TableRow key={row.id}>
                  <DataTableBodyCell>
                    <Tooltip title={i18n('common.view')}>
                      <IconButton
                        onClick={() =>
                          doOpenSelectdValues(row.values)
                        }
                        color={sidenavColor}
                        size="small"
                      >
                        <SearchIcon />
                      </IconButton>
                    </Tooltip>
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {moment(row.timestamp).format(
                      DEFAULT_MOMENT_FORMAT,
                    )}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.createdByEmail}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.entityName}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.action}
                  </DataTableBodyCell>
                  <DataTableBodyCell>
                    {row.entityId}
                  </DataTableBodyCell>
                </TableRow>
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
    </>
  );
}

export default AuditLogTable;
