const { Service } = require('feathers-sequelize');
const docs = require('./profiles.documentation');

exports.Profiles = class Profiles extends Service {
  
    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }

};
