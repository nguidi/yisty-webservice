const { Service } = require('feathers-sequelize');
const docs = require('./food_preferences.documentation');

exports.FoodPreferences = class FoodPreferences extends Service {

    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }
  
};
