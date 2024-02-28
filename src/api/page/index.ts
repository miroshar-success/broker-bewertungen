export default (app) => {
  // #region front-end APIs
  app.post(`/general-page`, require('./pageHome').default);
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/general-page`,
    require('./pageCreate').default,
  );
  app.put(
    `/tenant/:tenantId/general-page/:id`,
    require('./pageUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/general-page/import`,
    require('./pageImport').default,
  );
  app.delete(
    `/tenant/:tenantId/general-page`,
    require('./pageDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/general-page/autocomplete`,
    require('./pageAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/general-page`,
    require('./pageList').default,
  );
  app.get(
    `/tenant/:tenantId/general-page/:id`,
    require('./pageFind').default,
  );
  // #endregion
};
