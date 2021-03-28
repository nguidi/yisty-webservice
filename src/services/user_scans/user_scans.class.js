const { Service } = require('feathers-sequelize');
const docs = require('./user_scans.documentation');

exports.UserScans = class UserScans extends Service {

  constructor(options, app) {
        
    super(options, app);

    this.docs = docs;
    
  }

};
