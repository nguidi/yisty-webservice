const { hooks } = require('@feathersjs/authentication/lib');

module.exports = function (context) {

  if (!context.params.query.userId) {
    context.params.query.userId = context.params.user.id;
  }
    
  return context;

};