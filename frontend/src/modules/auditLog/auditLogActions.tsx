import AuditLogService from 'src/modules/auditLog/auditLogService';
import selectors from 'src/modules/auditLog/auditLogSelectors';
import exporterFields from 'src/modules/auditLog/auditLogExporterFields';
import { i18n } from 'src/i18n';
import Errors from 'src/modules/shared/error/errors';
import Exporter from 'src/modules/shared/exporter/exporter';

const prefix = 'AUDIT_LOG';

const auditLogActions = {
  FETCH_STARTED: `${prefix}_FETCH_STARTED`,
  FETCH_SUCCESS: `${prefix}_FETCH_SUCCESS`,
  FETCH_ERROR: `${prefix}_FETCH_ERROR`,

  RESETED: `${prefix}_RESETED`,

  PAGINATION_CHANGED: `${prefix}_PAGINATION_CHANGED`,
  SORTER_CHANGED: `${prefix}_SORTER_CHANGED`,

  EXPORT_STARTED: `${prefix}_EXPORT_STARTED`,
  EXPORT_SUCCESS: `${prefix}_EXPORT_SUCCESS`,
  EXPORT_ERROR: `${prefix}_EXPORT_ERROR`,

  doReset: () => async (dispatch) => {
    dispatch({
      type: auditLogActions.RESETED,
    });

    dispatch(auditLogActions.doFetch());
  },

  doExport: () => async (dispatch, getState) => {
    try {
      if (!exporterFields || !exporterFields.length) {
        throw new Error('exporterFields is required');
      }

      dispatch({
        type: auditLogActions.EXPORT_STARTED,
      });

      const filter = selectors.selectFilter(getState());

      const response = await AuditLogService.fetch(
        filter,
        selectors.selectOrderBy(getState()),
        null,
        null,
      );

      new Exporter(
        exporterFields,
        i18n('auditLog.exporterFileName'),
      ).transformAndExportAsExcelFile(response.rows);

      dispatch({
        type: auditLogActions.EXPORT_SUCCESS,
      });
    } catch (error) {
      Errors.handle(error);

      dispatch({
        type: auditLogActions.EXPORT_ERROR,
      });
    }
  },

  doChangePagination:
    (pagination) => async (dispatch, getState) => {
      dispatch({
        type: auditLogActions.PAGINATION_CHANGED,
        payload: pagination,
      });

      const filter = selectors.selectFilter(getState());
      const rawFilter = selectors.selectRawFilter(
        getState(),
      );
      dispatch(
        auditLogActions.doFetch(filter, rawFilter, true),
      );
    },

  doChangeSort: (sorter) => async (dispatch, getState) => {
    dispatch({
      type: auditLogActions.SORTER_CHANGED,
      payload: sorter,
    });

    const filter = selectors.selectFilter(getState());
    const rawFilter = selectors.selectRawFilter(getState());
    dispatch(
      auditLogActions.doFetch(filter, rawFilter, true),
    );
  },

  doFetch:
    (filter?, rawFilter?, keepPagination = true) =>
    async (dispatch, getState) => {
      try {
        dispatch({
          type: auditLogActions.FETCH_STARTED,
          payload: { filter, rawFilter, keepPagination },
        });

        const response = await AuditLogService.fetch(
          filter,
          selectors.selectOrderBy(getState()),
          selectors.selectLimit(getState()),
          selectors.selectOffset(getState()),
        );

        dispatch({
          type: auditLogActions.FETCH_SUCCESS,
          payload: {
            rows: response.rows,
            count: response.count,
          },
        });
      } catch (error) {
        Errors.handle(error);

        dispatch({
          type: auditLogActions.FETCH_ERROR,
        });
      }
    },
};

export default auditLogActions;
