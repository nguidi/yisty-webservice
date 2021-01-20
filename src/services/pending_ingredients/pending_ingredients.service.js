// Initializes the `pending_ingredients` service on path `/pending_ingredients`
const { PendingIngredients } = require('./pending_ingredients.class');
const createModel = require('../../models/pending_ingredients.model');
const hooks = require('./pending_ingredients.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/pending_ingredients', new PendingIngredients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('pending_ingredients');

  service.hooks(hooks);
};
