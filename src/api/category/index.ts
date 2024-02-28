export default (app) => {
  // #region front-end APIs
  app.post('/category', require('./categoryHome').default);
  app.get(
    '/category/footer',
    require('./categoryFooter').default,
  );
  app.get(
    '/category/sidebar',
    require('./categorySidebar').default,
  );
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/category`,
    require('./categoryCreate').default,
  );
  app.put(
    `/tenant/:tenantId/category/:id`,
    require('./categoryUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/category/import`,
    require('./categoryImport').default,
  );
  app.delete(
    `/tenant/:tenantId/category`,
    require('./categoryDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/category/autocomplete`,
    require('./categoryAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/category`,
    require('./categoryList').default,
  );
  app.get(
    `/tenant/:tenantId/category/:id`,
    require('./categoryFind').default,
  );
  // #endregion
};
