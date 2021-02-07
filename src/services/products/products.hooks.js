const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common')
const omit = require('../../hooks/omit.js')

const categoryRelation = {
  include: {
    service: 'categories',
    nameAs: 'category',
    parentField: 'categoryId',
    childField: 'id'
  }
}

const manufacturerRelation = {
  include: {
    service: 'manufacturers',
    nameAs: 'manufacturer',
    parentField: 'manufacturerId',
    childField: 'id'
  }
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      populate({ schema: categoryRelation}),
      populate({ schema: manufacturerRelation}),
      omit(['categoryId', 'manufacturerId', '_include'])
    ],
    get: [
      populate({ schema: categoryRelation}),
      populate({ schema: manufacturerRelation}),
      omit(['categoryId', 'manufacturerId', '_include'])
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
