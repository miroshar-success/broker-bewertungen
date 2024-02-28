export default (app) => {
  // #region front-end APIs
  app.post(
    `/broker-post`,
    require('./brokerPostCreate').default,
  );
  app.get(
    `/brokerPost-list`,
    require('./brokerPostHome').default,
  );
  // #endregion

  // #region back-end APIs
  app.post(
    `/tenant/:tenantId/broker-post`,
    require('./brokerPostCreate').default,
  );
  app.put(
    `/tenant/:tenantId/broker-post/:id`,
    require('./brokerPostUpdate').default,
  );
  app.post(
    `/tenant/:tenantId/broker-post/import`,
    require('./brokerPostImport').default,
  );
  app.delete(
    `/tenant/:tenantId/broker-post`,
    require('./brokerPostDestroy').default,
  );
  app.post(
    `/tenant/:tenantId/broker-post/review`,
    require('./brokerPostReview').default,
  );
  app.post(
    `/tenant/:tenantId/broker-post/spam`,
    require('./brokerPostSpam').default,
  );
  app.get(
    `/tenant/:tenantId/broker-post/autocomplete`,
    require('./brokerPostAutocomplete').default,
  );
  app.get(
    `/tenant/:tenantId/broker-post`,
    require('./brokerPostList').default,
  );
  app.get(
    `/tenant/:tenantId/broker-post/:id`,
    require('./brokerPostFind').default,
  );
  // #endregion
};
