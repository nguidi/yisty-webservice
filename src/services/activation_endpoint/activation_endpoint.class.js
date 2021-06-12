const { Service } = require('feathers-sequelize');
const docs = require('./activation_endpoint.documentation');

exports.ActivationEndpoint = class ActivationEndpoint extends Service {
  
    constructor(options, app) {
        
        super(options, app);
    
        this.docs = docs;
        
      }

};
