const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate, iff } = require('feathers-hooks-common')
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

async function populateProductFoodPreference(context) {

  let foodPreference = context.params.user.foodPreference;

  context.result.data = await context.result.data.map( async product => {
    product.foodPreference = (await context.app.service('products_food_preferences').find({ query: { product_id: product.id, food_preference_id: foodPreference }})).pop()
  })

  return context

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
      iff(context => (context.params.user.profile == 2), populateProductFoodPreference), // Si soy un mero user
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
