const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  let authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  authentication.docs = {
    description: 'A service to send and receive messages',
    definitions: {
      messages: {
        'type': 'object',
        'required': [
          'text'
        ],
        'properties': {
          'text': {
            'type': 'string',
            'description': 'The message text'
          },
          'userId': {
            'type': 'string',
            'description': 'The id of the user that sent the message'
          }
        }
      }
    }
  };

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
