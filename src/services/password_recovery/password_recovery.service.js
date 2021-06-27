// Initializes the `password_recovery` service on path `/password_recovery`
const { PasswordRecovery } = require('./password_recovery.class');
const createModel = require('../../models/password_recovery.model');
const hooks = require('./password_recovery.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/password_recovery', new PasswordRecovery(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('password_recovery');

  service.hooks(hooks);
};
