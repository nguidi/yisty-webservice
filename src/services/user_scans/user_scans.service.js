// Initializes the `user_scans` service on path `/user_scans`
const { UserScans } = require('./user_scans.class');
const createModel = require('../../models/user_scans.model');
const hooks = require('./user_scans.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user_scans', new UserScans(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user_scans');

  service.hooks(hooks);
};
