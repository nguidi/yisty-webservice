const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;
const { populate } = require('feathers-hooks-common')
const omit = require('../../hooks/omit.js')

const userProfileRelation = {
  include: {
    service: 'profiles',
    nameAs: 'profile',
    parentField: 'profileId',
    childField: 'id'
  }
}

async function setDefaultUserParams(hook) {
  // Seteamos que este desactivado por defecto, para que lo activen por mail
  hook.data.active = false;

  // Fijamos el perfil 2 (Cliente) si no viene con un perfil, por defecto, lo que hace la app de celular
  if (!hook.data.profile_id) hook.data.profile_id = 2;
}

async function sendActivationEmail(hook) {
  // Envio el email usando sendGrid
  let SendGrid = hook.app.get('SendGrid');

  console.log({
    to: hook.result.email,
    from: 'neri.guidi@gmail.com', // Use the email address or domain you verified above
    subject: 'Activa tu cuenta salamin',
    html: `<strong>Apreta el siguiente link si queres vivir: ${hook.app.get('activation_endpoint')} </strong>`,
  })

  let result = await SendGrid.send({
    to: hook.result.email,
    from: 'neri.guidi@gmail.com', // Use the email address or domain you verified above
    subject: 'Activa tu cuenta salamin',
    html: `<strong>Apreta el siguiente link si queres vivir: ${hook.app.get('activation_endpoint')} </strong>`,
  });

  console.log(result)
}


module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [ hashPassword('password'), setDefaultUserParams ],
    update: [ hashPassword('password'),  authenticate('jwt') ],
    patch: [ hashPassword('password'),  authenticate('jwt') ],
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
      omit(['profileId', '_include'])
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
