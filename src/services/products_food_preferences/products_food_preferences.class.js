const { Service } = require('feathers-sequelize');
const docs = require('./products_food_preferences.documentation');

exports.ProductsFoodPreferences = class ProductsFoodPreferences extends Service {
  
  constructor(options, app) {
        
    super(options, app);

    this.docs = docs;
    
  }

};
