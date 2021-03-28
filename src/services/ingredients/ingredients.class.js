const { Service } = require('feathers-sequelize');
const docs = require('./ingredients.documentation');

exports.Ingredients = class Ingredients extends Service {
  
  constructor(options, app) {
        
    super(options, app);

    this.docs = docs;
    
  }

};
