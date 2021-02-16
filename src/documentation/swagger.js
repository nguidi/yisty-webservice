const swagger = require('feathers-swagger');

module.exports = app => {

  app.configure(swagger({
    openApiVersion: 3,
    uiIndex: true,
    docsPath: '/docs',
    docsJsonPath: '/docs/schema',
    specs: {
      info: {
        title: 'Yisty',
        description: 'Yisty Backend Documentation',
        version: '1.0.0',
      },
    },
    ignore: { paths: [ ] },
    defaults: {
      schemasGenerator(service, model, modelName) {
        if (service.options && service.options.Model) {
          const modelSchema = app.get('jsonSchemaManager').generate(
            service.options.Model,
            app.get('openApi3Strategy'),
            service.options.Model.options.jsonSchema,
          );

          return {
            [model]: modelSchema,
            [`${model}_list`]: {
              title: `${modelName} list`,
              type: 'array',
              items: { $ref: `#/components/schemas/${model}` },
            },
          };
        }
      }
    }
  }));
};