// Initializes the `affiliate_shops` service on path `/affiliate_shops`
const { AffiliateShops } = require('./affiliate_shops.class');
const createModel = require('../../models/affiliate_shops.model');
const hooks = require('./affiliate_shops.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/affiliate_shops', new AffiliateShops(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('affiliate_shops');

  service.hooks(hooks);
};
