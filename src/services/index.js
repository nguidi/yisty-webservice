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
};
