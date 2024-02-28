import sitemapActions from 'src/modules/sitemap/sitemapActions';

const initialState = {
  loading: false,
};

export default (
  state = initialState,
  { type, payload },
) => {
  if (type === sitemapActions.REFRESH_START) {
    return {
      ...state,
      loading: true,
    };
  }

  if (type === sitemapActions.REFRESH_SUCCESS) {
    return {
      ...state,
      loading: false,
    };
  }

  if (type === sitemapActions.REFRESH_ERROR) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
};
