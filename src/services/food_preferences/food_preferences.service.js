// Initializes the `food_preferences` service on path `/food_preferences`
const { FoodPreferences } = require('./food_preferences.class');
const createModel = require('../../models/food_preferences.model');
const hooks = require('./food_preferences.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/food_preferences', new FoodPreferences(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('food_preferences');

  service.hooks(hooks);
};
