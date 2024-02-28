export default (app) => {
  // #region front-end APIs
  app.post(
    `/affiliate-link/home`,
    require('./affiliateLinkHome').default,
  );
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/affiliate-link`,
    require('./affiliateLinkCreate').default,
  );
  app.put(
    `/tenant/:tenantId/affiliate-link/:id`,
    require('./affiliateLinkUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/affiliate-link/import`,
    require('./affiliateLinkImport').default,
  );
  app.delete(
    `/tenant/:tenantId/affiliate-link`,
    require('./affiliateLinkDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/affiliate-link/autocomplete`,
    require('./affiliateLinkAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/affiliate-link`,
    require('./affiliateLinkList').default,
  );
  app.get(
    `/tenant/:tenantId/affiliate-link/:id`,
    require('./affiliateLinkFind').default,
  );
  // #endregion
};
