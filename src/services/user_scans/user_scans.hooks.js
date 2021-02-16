const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common')
const omit = require('../../hooks/omit.js')
const userQuery = require('../../hooks/userQuery.js')

const manufacturerRelation = {
  include: {
    service: 'products',
    nameAs: 'product',
    parentField: 'productId',
    childField: 'id'
  }
}


module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ userQuery ],
    get: [ userQuery ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [
      populate({ schema: manufacturerRelation}),
      omit(['productId', '_include'])
    ],
    create: [],
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
