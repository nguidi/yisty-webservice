// Initializes the `activation_endpoint` service on path `/activation_endpoint`
const { ActivationEndpoint } = require('./activation_endpoint.class');
const createModel = require('../../models/activation_endpoint.model');
const hooks = require('./activation_endpoint.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/activation_endpoint', new ActivationEndpoint(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('activation_endpoint');

  service.hooks(hooks);
};
