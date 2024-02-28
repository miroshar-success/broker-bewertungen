export default (app) => {
  // #region front-end APIs
  app.get('/author', require('./authorFirst').default);
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/author`,
    require('./authorCreate').default,
  );
  app.put(
    `/tenant/:tenantId/author/:id`,
    require('./authorUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/author/import`,
    require('./authorImport').default,
  );
  app.delete(
    `/tenant/:tenantId/author`,
    require('./authorDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/author/autocomplete`,
    require('./authorAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/author`,
    require('./authorList').default,
  );
  app.get(
    `/tenant/:tenantId/author/:id`,
    require('./authorFind').default,
  );
  // #endregion
};
