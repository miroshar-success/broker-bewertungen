export default (app) => {
  // #region front-end APIs
  app.post(
    `/broker-article`,
    require('./brokerArticleHome').default,
  );
  // #endregion
  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/broker-article`,
    require('./brokerArticleCreate').default,
  );
  app.put(
    `/tenant/:tenantId/broker-article/:id`,
    require('./brokerArticleUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/broker-article/import`,
    require('./brokerArticleImport').default,
  );
  app.delete(
    `/tenant/:tenantId/broker-article`,
    require('./brokerArticleDestroy').default,
  );
  app.get(
    `/tenant/:tenantId/broker-article/autocomplete`,
    require('./brokerArticleAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/broker-article`,
    require('./brokerArticleList').default,
  );
  app.get(
    `/tenant/:tenantId/broker-article/:id`,
    require('./brokerArticleFind').default,
  );
  // #endregion
};
