import actions from 'src/modules/navigation/list/navigationListActions';

const INITIAL_PAGE_SIZE = 10;

const initialData = {
  rows: [] as Array<any>,
  count: 0,
  loading: false,
  filter: {},
  rawFilter: {},
  pagination: {
    current: 1,
    pageSize: INITIAL_PAGE_SIZE,
  },
  sorter: {},
  selectedKeys: [] as Array<any>,
};

export default (state = initialData, { type, payload }) => {
  if (type === actions.RESETED) {
    return {
      ...initialData,
    };
  }

  if (type === actions.TOGGLE_ONE_SELECTED) {
    let selectedKeys = state.selectedKeys;

    const exists = selectedKeys.includes(payload);

    if (exists) {
      selectedKeys = selectedKeys.filter(
        (key) => key !== payload,
      );
    } else {
      selectedKeys = [payload, ...selectedKeys];
    }

    return {
      ...state,
      selectedKeys,
    };
  }

  if (type === actions.TOGGLE_ALL_SELECTED) {
    const isAllSelected =
      (state.rows || []).length ===
      (state.selectedKeys || []).length;

    return {
      ...state,
      selectedKeys: isAllSelected
        ? []
        : state.rows.map((row) => row.id),
    };
  }

  if (type === actions.CLEAR_ALL_SELECTED) {
    return {
      ...state,
      selectedKeys: [],
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
      sorter: payload || {},
    };
  }

  if (type === actions.FETCH_STARTED) {
    return {
      ...state,
      loading: true,
      selectedKeys: [],
      filter: payload ? payload.filter : {},
      rawFilter: payload ? payload.rawFilter : {},
      pagination:
        payload && payload.keepPagination
          ? state.pagination
          : {
              current: 1,
              pageSize: INITIAL_PAGE_SIZE,
            },
    };
  }

  if (type === actions.FETCH_SUCCESS) {
    return {
      ...state,
      loading: false,
      rows: payload.rows,
      count: payload.count,
    };
  }

  if (type === actions.FETCH_ERROR) {
    return {
      ...state,
      loading: false,
      rows: [],
      count: 0,
    };
  }

  if (type === actions.EXPORT_STARTED) {
    return {
      ...state,
      exportLoading: true,
    };
  }

  if (type === actions.EXPORT_SUCCESS) {
    return {
      ...state,
      exportLoading: false,
    };
  }

  if (type === actions.EXPORT_ERROR) {
    return {
      ...state,
      exportLoading: false,
    };
  }

  return state;
};
