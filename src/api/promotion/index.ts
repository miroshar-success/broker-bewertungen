export default (app) => {
  // #region front-end APIs
  app.get('/promotion', require('./promotionHome').default);
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/promotion`,
    require('./promotionCreate').default,
  );
  app.put(
    `/tenant/:tenantId/promotion/:id`,
    require('./promotionUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/promotion/import`,
    require('./promotionImport').default,
  );
  app.delete(
    `/tenant/:tenantId/promotion`,
    require('./promotionDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/promotion/autocomplete`,
    require('./promotionAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/promotion`,
    require('./promotionList').default,
  );
  app.get(
    `/tenant/:tenantId/promotion/:id`,
    require('./promotionFind').default,
  );
  // #endregion
};
