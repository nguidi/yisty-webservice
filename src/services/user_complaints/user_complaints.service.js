// Initializes the `user_complaints` service on path `/user_complaints`
const { UserComplaints } = require('./user_complaints.class');
const createModel = require('../../models/user_complaints.model');
const hooks = require('./user_complaints.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/user_complaints', new UserComplaints(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('user_complaints');

  service.hooks(hooks);
};
