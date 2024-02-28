export default (app) => {
  // #region front-end APIs
  app.get(
    `/navigation`,
    require('./navigationHome').default,
  );
  app.get(
    `/navigation/most-read`,
    require('./navigationMostRead').default,
  );
  app.get(
    `/navigation/forex-school`,
    require('./navigationForexSchool').default,
  );
  app.get(
    `/navigation/forex-strategy`,
    require('./navigationForexStrategy').default,
  );
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/navigation`,
    require('./navigationCreate').default,
  );
  app.put(
    `/tenant/:tenantId/navigation/:id`,
    require('./navigationUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/navigation/import`,
    require('./navigationImport').default,
  );
  app.delete(
    `/tenant/:tenantId/navigation`,
    require('./navigationDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/navigation/autocomplete`,
    require('./navigationAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/navigation`,
    require('./navigationList').default,
  );
  app.get(
    `/tenant/:tenantId/navigation/:id`,
    require('./navigationFind').default,
  );
  // #endregion
};
