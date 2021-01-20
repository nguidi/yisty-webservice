const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');

module.exports = app => {
  let authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());

  authentication.docs = {
    description: 'Permite autentificarse frente al Webservice',
    paths: {
      '/authentication': {
        'post': {
          "description": "Returns all pets from the system that the user has access to",
          "responses": {
            "200": {          
              "description": "A list of pets.",
              "content": {
                "application/json": {
                  "schema": {
                    "type": "array",
                    "items": {
                      "$ref": "#/components/schemas/pet"
                    }
                  }
                }
              }
            }
          }
        },
        'delete': {

        }
      }
    }
  };

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
