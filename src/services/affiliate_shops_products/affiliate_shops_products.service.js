// Initializes the `affiliate_shops_products` service on path `/affiliate_shops_products`
const { AffiliateShopsProducts } = require('./affiliate_shops_products.class');
const createModel = require('../../models/affiliate_shops_products.model');
const hooks = require('./affiliate_shops_products.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/affiliate_shops_products', new AffiliateShopsProducts(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('affiliate_shops_products');

  service.hooks(hooks);
};
