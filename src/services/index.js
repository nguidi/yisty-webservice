const users = require('./users/users.service.js');
const profiles = require('./profiles/profiles.service.js');
const categories = require('./categories/categories.service.js');
const affiliateShops = require('./affiliate_shops/affiliate_shops.service.js');
const foodPreferences = require('./food_preferences/food_preferences.service.js');
const ingredients = require('./ingredients/ingredients.service.js');
const products = require('./products/products.service.js');
const manufacturers = require('./manufacturers/manufacturers.service.js');
const userComplaints = require('./user_complaints/user_complaints.service.js');
const userScans = require('./user_scans/user_scans.service.js');
const pendingProducts = require('./pending_products/pending_products.service.js');
const pendingIngredients = require('./pending_ingredients/pending_ingredients.service.js');
const productsFoodPreferences = require('./products_food_preferences/products_food_preferences.service.js');
const affiliateShopsProducts = require('./affiliate_shops_products/affiliate_shops_products.service.js');
const activationEndpoint = require('./activation_endpoint/activation_endpoint.service.js');
const passwordRecovery = require('./password_recovery/password_recovery.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(profiles);
  app.configure(users);
  app.configure(categories);
  app.configure(affiliateShops);
  app.configure(foodPreferences);
  app.configure(ingredients);
  app.configure(products);
  app.configure(manufacturers);
  app.configure(userComplaints);
  app.configure(userScans);
  app.configure(pendingProducts);
  app.configure(pendingIngredients);
  app.configure(productsFoodPreferences);
  app.configure(affiliateShopsProducts);
  app.configure(activationEndpoint);
  app.configure(passwordRecovery);
};
