export default (app) => {
  // #region front-end APIs
  app.get(`/blog`, require('./blogHome').default);
  app.post(
    `/individual-blog`,
    require('./blogContent').default,
  );
  // #endregion

  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/blog`,
    require('./blogCreate').default,
  );
  app.put(
    `/tenant/:tenantId/blog/:id`,
    require('./blogUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/blog/import`,
    require('./blogImport').default,
  );
  app.delete(
    `/tenant/:tenantId/blog`,
    require('./blogDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/blog/autocomplete`,
    require('./blogAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/blog`,
    require('./blogList').default,
  );
  app.get(
    `/tenant/:tenantId/blog/:id`,
    require('./blogFind').default,
  );
  // #endregion
};
