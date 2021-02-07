const { Service } = require('feathers-sequelize');
const docs = require('./pending_products.documentation');

exports.PendingProducts = class PendingProducts extends Service {
  
    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }

};
