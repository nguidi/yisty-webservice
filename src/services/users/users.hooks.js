const errors = require('@feathersjs/errors');
const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const bcrypt = require('bcryptjs');
const { populate } = require('feathers-hooks-common');
const omit = require('../../hooks/omit.js');

const userProfileRelation = {
  include: {
    service: 'profiles',
    nameAs: 'profile',
    parentField: 'profileId',
    childField: 'id'
  }
};

const userFoodPreferenceRelation = {
  include: {
    service: 'food_preferences',
    nameAs: 'food_preference',
    parentField: 'foodPreferenceId',
    childField: 'id'
  }
};

async function setDefaultUserParams(hook) {
  // Seteamos que este desactivado por defecto, para que lo activen por mail
  hook.data.active = false;

  // Fijamos el perfil 2 (Cliente) si no viene con un perfil, por defecto, lo que hace la app de celular
  if (!hook.data.profileId) hook.data.profileId = 2;
}

async function shouldIContinue(hook) {
  let user = await hook.app.service('users').get(hook.id);

  if (hook.data.newPassword) {
    let match = await bcrypt.compare(hook.data.password, user.password);

    if (match) {
      hook.data.password = hook.data.newPassword;
    } else {
      return Promise.reject(new errors.BadRequest({
          errors: {
            password: 'Wrong password'
          }
        })
      );
    }

  }

  return hook;  

}

module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), setDefaultUserParams ],
    update: [ authenticate('jwt'), shouldIContinue, hashPassword('password') ],
    patch: [ authenticate('jwt'), shouldIContinue, hashPassword('password') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [ 
      populate({ schema: userProfileRelation}),
      omit(['profileId', '_include'])
    ],
    get: [
      populate({ schema: userProfileRelation}),
      populate({ schema: userFoodPreferenceRelation}),
      omit(['profileId', 'foodPreferenceId', '_include'])
    ],
    create: [
      //sendActivationEmail
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
