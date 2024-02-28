import statuses from 'src/modules/shared/importer/importerStatuses';

const INITIAL_PAGE_SIZE = 10;

export default (actions) => {
  const initialData = {
    rows: [] as Array<any>,
    errorMessage: null,
    importing: false,
    completed: false,
    pagination: {
      current: 1,
      pageSize: INITIAL_PAGE_SIZE,
    },
    sorter: {},
  };

  return (state = initialData, { type, payload }) => {
    if (type === actions.RESETED) {
      return {
        ...initialData,
      };
    }

    if (type === actions.PAGINATION_CHANGED) {
      return {
        ...state,
        pagination: payload || {
          current: 1,
          pageSize: INITIAL_PAGE_SIZE,
        },
      };
    }

    if (type === actions.SORTER_CHANGED) {
      return {
        ...state,
        sorter: payload.sorter || {},
        rows: payload.sortedRows || [],
      };
    }

    if (type === actions.FILE_READ_ERROR) {
      return {
        ...state,
        errorMessage: payload.message
          ? payload.message
          : payload,
      };
    }

    if (type === actions.FILE_READ_SUCCESS) {
      return {
        ...state,
        errorMessage: null,
        rows: payload,
      };
    }

    if (type === actions.IMPORT_STARTED) {
      return {
        ...state,
        importing: true,
      };
    }

    if (type === actions.IMPORT_PAUSED) {
      return {
        ...state,
        importing: false,
      };
    }

    if (type === actions.IMPORT_SUCCESS) {
      return {
        ...state,
        importing: false,
        completed: true,
      };
    }

    if (type === actions.IMPORT_ERROR) {
      return {
        ...state,
        importing: false,
      };
    }

    if (type === actions.IMPORT_BATCH_SUCCESS) {
      const item = (state.rows || []).find(
        (item) => item._line === payload.line,
      );

      if (!item) {
        return;
      }

      item._status = statuses.IMPORTED;

      return {
        ...state,
        rows: [...state.rows],
      };
    }

    if (type === actions.IMPORT_BATCH_ERROR) {
      const item = (state.rows || []).find(
        (item) => item._line === payload.line,
      );

      if (!item) {
        return;
      }

      item._status = statuses.ERROR;
      item._errorMessage = payload.errorMessage;

      return {
        ...state,
        rows: [...state.rows],
      };
    }

    return state;
  };
};
