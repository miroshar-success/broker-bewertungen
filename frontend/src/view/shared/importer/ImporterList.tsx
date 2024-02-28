import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { i18n } from 'src/i18n';
import ImporterRowStatus from 'src/view/shared/importer/ImporterRowStatus';
import Pagination from 'src/view/shared/table/Pagination';
import {
  TableBody,
  TableRow,
  Table,
  TableContainer,
} from '@mui/material';
import { selectMuiSettings } from 'src/modules/mui/muiSelectors';
import DataTableBodyCell from 'src/mui/shared/Tables/DataTable/DataTableBodyCell';
import MDBox from 'src/mui/components/MDBox';
import DataTableHeadCell from 'src/mui/shared/Tables/DataTable/DataTableHeadCell';

export default (selectors, actions, fields) => {
  function ImporterList() {
    const dispatch = useDispatch();
    const { sidenavColor } = selectMuiSettings();
    const rows: Array<any> = useSelector(
      selectors.selectRows,
    );
    const currentPageRows: Array<any> = useSelector(
      selectors.selectCurrentPageRows,
    );
    const pendingRowsCount: number = useSelector(
      selectors.selectPendingRowsCount,
    );
    const errorRowsCount: number = useSelector(
      selectors.selectErrorRowsCount,
    );
    const importedRowsCount: number = useSelector(
      selectors.selectImportedRowsCount,
    );
    const sorter: any = useSelector(selectors.selectSorter);
    const pagination: any = useSelector(
      selectors.selectPagination,
    );

    const labelDisplayedRows = (from, to, count) => {
      return i18n(
        'importer.total',
        importedRowsCount,
        pendingRowsCount,
        errorRowsCount,
      );
    };

    const doChangeSort = (field) => {
      const order =
        sorter.field === field && sorter.order === 'asc'
          ? 'desc'
          : 'asc';

      dispatch(
        actions.doChangeSort(rows, {
          field,
          order,
        }),
      );
    };

    const doChangePagination = (pagination) => {
      dispatch(actions.doChangePagination(pagination));
    };

    return (
      <>
        <TableContainer sx={{ boxShadow: 'none' }}>
          <Table>
            <MDBox component="thead">
              <TableRow>
                <DataTableHeadCell
                  onClick={() => doChangeSort('_line')}
                  sorted={
                    sorter.field === '_line'
                      ? sorter.order
                      : 'none'
                  }
                >
                  {i18n('importer.line')}
                </DataTableHeadCell>
                {fields.map((schemaItem) => (
                  <DataTableHeadCell
                    key={schemaItem.name}
                    onClick={() =>
                      doChangeSort(schemaItem.name)
                    }
                    sorted={
                      sorter.field === schemaItem.name
                        ? sorter.order
                        : 'none'
                    }
                  >
                    {schemaItem.label}
                  </DataTableHeadCell>
                ))}
                <DataTableHeadCell
                  onClick={() => doChangeSort('_status')}
                  sorted={
                    sorter.field === '_status'
                      ? sorter.order
                      : 'none'
                  }
                >
                  {i18n('importer.status')}
                </DataTableHeadCell>
              </TableRow>
            </MDBox>
            <TableBody>
              {currentPageRows.map((row) => (
                <TableRow key={row._line}>
                  <DataTableBodyCell>
                    {row._line}
                  </DataTableBodyCell>
                  {fields.map((schemaItem) => (
                    <DataTableBodyCell
                      key={schemaItem.name}
                    >
                      <pre
                        style={{ fontFamily: 'inherit' }}
                      >
                        {schemaItem.render
                          ? schemaItem.render(
                              row[schemaItem.name],
                            )
                          : row[schemaItem.name] != null
                          ? String(row[schemaItem.name])
                          : null}
                      </pre>
                    </DataTableBodyCell>
                  ))}
                  <DataTableBodyCell>
                    <ImporterRowStatus
                      value={row._status}
                      errorMessage={row._errorMessage}
                    />
                  </DataTableBodyCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Pagination
            onChange={doChangePagination}
            // disabled={loading}
            labelDisplayedRows={labelDisplayedRows}
            pagination={pagination}
            entriesPerPage
            showTotalEntries
          />
        </TableContainer>
      </>
    );
  }

  return ImporterList;
};
