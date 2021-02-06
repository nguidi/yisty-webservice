const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const serviceDoc  = require('./documentation/services/authentication.js');

module.exports = app => {
  let authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  authentication.docs = serviceDoc;

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
