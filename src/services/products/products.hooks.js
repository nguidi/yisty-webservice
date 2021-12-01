const { authenticate } = require('@feathersjs/authentication').hooks;
const { populate, iff } = require('feathers-hooks-common');
const omit = require('../../hooks/omit.js');

const categoryRelation = {
  include: {
    service: 'categories',
    nameAs: 'category',
    parentField: 'categoryId',
    childField: 'id'
  }
};

const manufacturerRelation = {
  include: {
    service: 'manufacturers',
    nameAs: 'manufacturer',
    parentField: 'manufacturerId',
    childField: 'id'
  }
};

async function addIngredients(context) {
  console.log(context.result)
}

async function populateProductFoodPreference(context) {

  let foodPreference = context.params.user.food_preference.id;

  let dataToTransform = (Array.isArray(context.result)) ? context.result : (context.result.data || [context.result]) ;

  console.log(dataToTransform)

  dataToTransform = await Promise.all(dataToTransform.map( async product => {
    let aux = (await context.app.service('products_food_preferences').find({ query: { product_id: product.id, food_preference_id: foodPreference }}))
    product.foodPreference = (aux.data.length > 0) ? aux.data.pop().result : undefined;
    return product;
  }));

  console.log("b",dataToTransform)

  if (Array.isArray(context.result)) {
    context.result = dataToTransform;
  } else {
    if (context.result.data) {
      context.result.data = dataToTransform;
    } else {
      context.result = dataToTransform
    }
  }

  return context;

}

async function populateAffilateShopRelation(context) {

  let client = context.app.get('sequelizeClient');

  let dataToTransform = (Array.isArray(context.result)) ? context.result : (context.result.data || [context.result]) ;

  dataToTransform = await Promise.all(dataToTransform.map( async product => {
  
    let list = await client.models.affiliate_shops_products.findAll({
      where: {
        productId: product.id
      },
      raw: true
    });

    if (list.length > 0) {
      product.affiliateShops = await Promise.all(list.map( async afs => {
        let shop = (await context.app.service('affiliate_shops').get(afs.affiliateShopId));
        return Object.assign({ url: afs.url, description: afs.description}, shop);
      }));
    }
    
    return product;
  
  }));

  if (Array.isArray(context.result)) {
    context.result = dataToTransform;
  } else {
    if (context.result.data) {
      context.result.data = dataToTransform;
    } else {
      context.result = dataToTransform
    }
  }

  return context;
}

function verifyPopulateVars(context) {
  if (typeof context.params.query.affiliateShops !== 'undefined') {
    context.params['$populateAffiliatedShops'] = true;
    delete context.params.query.affiliateShops;
  }
  return context;
}

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [
      verifyPopulateVars
    ],
    get: [
      verifyPopulateVars
    ],
    create: [],
    update: [
      function rawFalse(context) {
        if (!context.params.sequelize) context.params.sequelize = {};
        Object.assign(context.params.sequelize, { raw: false });
        return context;
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [
      iff(context => (context.params.user.profile.id == 1), populateProductFoodPreference), // Si soy un mero user
      populate({ schema: categoryRelation}),
      populate({ schema: manufacturerRelation}),
      omit(['categoryId', 'manufacturerId', 'foodPreferenceId', '_include']),
      iff(context => (context.params.$populateAffiliatedShops == true), populateAffilateShopRelation), // Si soy quiero traer los afiliados
    ],
    get: [
      populate({ schema: categoryRelation}),
      populate({ schema: manufacturerRelation}),
      omit(['categoryId', 'manufacturerId', 'foodPreferenceId', '_include']),
      iff(context => (context.params.$populateAffiliatedShops == true), populateAffilateShopRelation), // Si soy quiero traer los afiliados
    ],
    create: [
      addIngredients
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
