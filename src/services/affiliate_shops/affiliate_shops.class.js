const { Service } = require('feathers-sequelize');
const docs = require('./affiliate_shops.documentation');

exports.AffiliateShops = class AffiliateShops extends Service {
  
    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }

};
