const { Service } = require('feathers-sequelize');
const docs = require('./products.documentation');

exports.Products = class Products extends Service {
  
  constructor(options, app) {
        
    super(options, app);

    this.docs = docs;
    
  }

};
