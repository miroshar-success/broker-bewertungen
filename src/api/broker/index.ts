export default (app) => {
  // #region front-end APIs
  app.get('/broker', require('./brokerHome').default);
  app.post('/broker', require('./brokerView').default);
  app.get(
    '/broker/comparable',
    require('./brokerComparable').default,
  );
  app.get(
    '/broker/featured',
    require('./brokerFeatured').default,
  );
  app.get('/broker/top', require('./brokerTop').default);
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/broker`,
    require('./brokerCreate').default,
  );
  app.put(
    `/tenant/:tenantId/broker/:id`,
    require('./brokerUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/broker/import`,
    require('./brokerImport').default,
  );
  app.delete(
    `/tenant/:tenantId/broker`,
    require('./brokerDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/broker/autocomplete`,
    require('./brokerAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/broker`,
    require('./brokerList').default,
  );
  app.get(
    `/tenant/:tenantId/broker/:id`,
    require('./brokerFind').default,
  );
  // #endregion
};
