// Initializes the `ingredients` service on path `/ingredients`
const { Ingredients } = require('./ingredients.class');
const createModel = require('../../models/ingredients.model');
const hooks = require('./ingredients.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/ingredients', new Ingredients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('ingredients');

  service.hooks(hooks);
};
