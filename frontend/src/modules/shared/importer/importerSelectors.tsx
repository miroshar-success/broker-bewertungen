import { createSelector } from 'reselect';
import statuses from 'src/modules/shared/importer/importerStatuses';
import _get from 'lodash/get';

export default (rawPath) => {
  const selectRaw = (state) => _get(state, rawPath);

  const selectRows = createSelector(
    [selectRaw],
    (raw) => raw.rows || [],
  );

  const selectHasRows = createSelector(
    [selectRows],
    (rows) => Boolean(rows.length),
  );

  const selectErrorMessage = createSelector(
    [selectRaw],
    (raw) => raw.errorMessage,
  );

  const selectPendingRows = createSelector(
    [selectRows],
    (rows) =>
      rows.filter(
        (row) => row._status === statuses.PENDING,
      ),
  );

  const selectPendingRowsCount = createSelector(
    [selectPendingRows],
    (pendingRows) => pendingRows.length,
  );

  const selectRowsCount = createSelector(
    [selectRows],
    (rows) => rows.length,
  );

  const selectImportedRowsCount = createSelector(
    [selectRows],
    (rows) =>
      rows.filter(
        (row) => row._status === statuses.IMPORTED,
      ).length,
  );

  const selectNonPendingRowsCount = createSelector(
    [selectRowsCount, selectPendingRowsCount],
    (allCount, pendingCount) => allCount - pendingCount,
  );

  const selectErrorRowsCount = createSelector(
    [selectRows],
    (rows) =>
      rows.filter((row) => row._status === statuses.ERROR)
        .length,
  );

  const selectImporting = createSelector(
    [selectRaw],
    (raw) => raw.importing,
  );

  const selectCompleted = createSelector(
    [selectRaw],
    (raw) => raw.completed,
  );

  const selectPercent = createSelector(
    [selectNonPendingRowsCount, selectRowsCount],
    (nonPendingRowsCount, rowsCount) =>
      (nonPendingRowsCount * 100) / rowsCount,
  );

  const selectCount = createSelector(
    [selectRaw],
    (raw) => raw.rows.length,
  );

  const selectSorter = createSelector(
    [selectRaw],
    (raw) => raw.sorter || {},
  );

  const selectLimit = createSelector([selectRaw], (raw) => {
    const pagination = raw.pagination;
    return pagination.pageSize;
  });

  const selectOffset = createSelector(
    [selectRaw],
    (raw) => {
      const pagination = raw.pagination;

      if (!pagination || !pagination.pageSize) {
        return 0;
      }

      const current = pagination.current || 1;

      return (current - 1) * pagination.pageSize;
    },
  );

  const selectPagination = createSelector(
    [selectRaw, selectCount],
    (raw, count) => {
      return {
        ...raw.pagination,
        total: count,
      };
    },
  );

  const selectCurrentPageRows = createSelector(
    [selectRows, selectOffset, selectLimit],
    (rows, offset, limit) => {
      return rows.slice(offset).slice(0, limit);
    },
  );

  const selectors = {
    selectRaw,
    selectRows,
    selectRowsCount,
    selectHasRows,
    selectErrorMessage,
    selectPendingRows,
    selectPendingRowsCount,
    selectImportedRowsCount,
    selectErrorRowsCount,
    selectNonPendingRowsCount,
    selectImporting,
    selectCompleted,
    selectPercent,
    selectPagination,
    selectSorter,
    selectLimit,
    selectOffset,
    selectCurrentPageRows,
  };

  return selectors;
};
