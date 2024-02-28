export default (app) => {
  app.put(
    `/tenant/:tenantId/mui`,
    require('./muiSave').default,
  );
  app.get(
    `/tenant/:tenantId/mui`,
    require('./muiFind').default,
  );
};
