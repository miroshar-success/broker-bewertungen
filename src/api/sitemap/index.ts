export default (app) => {
  app.post(
    '/sitemap/refresh',
    require('./sitemapRefresh').default,
  );
};
