const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate } = require('feathers-hooks-common');
const omit = require('../../hooks/omit.js');

const affilateShopRelation = {
  include: {
    service: 'affiliate_shops',
    nameAs: 'affilate_shops',
    parentField: 'affiliateShopId',
    childField: 'id'
  }
};

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
      populate({ schema: affilateShopRelation}),
      omit(['affiliateShopId', '_include'])
    ],
    get: [
      populate({ schema: affilateShopRelation}),
      omit(['affiliateShopId', '_include'])
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
