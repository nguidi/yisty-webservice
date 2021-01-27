// Initializes the `pending_products` service on path `/pending_products`
const { PendingProducts } = require('./pending_products.class');
const createModel = require('../../models/pending_products.model');
const hooks = require('./pending_products.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pending_products', new PendingProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pending_products');

  service.hooks(hooks);
};
