// Initializes the `profiles` service on path `/profiles`
const { Profiles } = require('./profiles.class');
const createModel = require('../../models/profiles.model');
const hooks = require('./profiles.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/profiles', new Profiles(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('profiles');

  service.hooks(hooks);
};
