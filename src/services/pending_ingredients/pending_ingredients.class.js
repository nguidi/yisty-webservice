const { Service } = require('feathers-sequelize');
const docs = require('./pending_ingredients.documentation');

exports.PendingIngredients = class PendingIngredients extends Service {
  
    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }

};
