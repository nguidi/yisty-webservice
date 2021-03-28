const { Service } = require('feathers-sequelize');
const docs = require('./manufacturers.documentation');

exports.Manufacturers = class Manufacturers extends Service {
  
  constructor(options, app) {
        
    super(options, app);

    this.docs = docs;
    
  }

};
