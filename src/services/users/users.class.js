const { Service } = require('feathers-sequelize');
const docs = require('./users.documentation');

exports.Users = class Users extends Service {
  
    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }

};
