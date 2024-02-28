export default (app) => {
  app.post(
    `/file/upload`,
    require('./localhost/upload').default,
  );
  app.get(
    `/file/download`,
    require('./localhost/download').default,
  );
  app.get(
    `/tenant/:tenantId/file/credentials`,
    require('./credentials').default,
  );
  app.post(
    `/tenant/:tenantId/file/ckeditor`,
    require('./ckeditor').default,
  );
};
