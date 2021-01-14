// Initializes the `manufacturers` service on path `/manufacturers`
const { Manufacturers } = require('./manufacturers.class');
const createModel = require('../../models/manufacturers.model');
const hooks = require('./manufacturers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/manufacturers', new Manufacturers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('manufacturers');

  service.hooks(hooks);
};
