const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const omit = require('../../hooks/omit.js');
const userQuery = require('../../hooks/userQuery.js');

const productRelation = {
  include: {
    service: 'products',
    nameAs: 'product',
    parentField: 'productId',
    childField: 'id',
    useInnerPopulate: true
  }
};


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
    find: [
      populate({ schema: productRelation}),
      omit(['productId', '_include'])
    ],
    get: [
      populate({ schema: productRelation}),
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
