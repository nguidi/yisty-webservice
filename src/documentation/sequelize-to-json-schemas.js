const { JsonSchemaManager, OpenApi3Strategy } = require('@alt3/sequelize-to-json-schemas');

module.exports = app => {

  const schemaManager = new JsonSchemaManager({
    baseUri: 'http://localhost:3030',
    absolutePaths: true,
  });
   
  const openApi3Strategy = new OpenApi3Strategy();
   
  app.set('jsonSchemaManager', schemaManager);
  app.set('openApi3Strategy', openApi3Strategy);

};