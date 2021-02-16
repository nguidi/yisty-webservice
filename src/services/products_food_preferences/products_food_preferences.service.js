// Initializes the `products_food_preferences` service on path `/products-food-preferences`
const { ProductsFoodPreferences } = require('./products_food_preferences.class');
const createModel = require('../../models/products_food_preferences.model');
const hooks = require('./products_food_preferences.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/products_food_preferences', new ProductsFoodPreferences(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('products_food_preferences');

  service.hooks(hooks);
};
