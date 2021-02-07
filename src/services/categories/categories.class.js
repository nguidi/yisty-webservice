const { Service } = require('feathers-sequelize');
const docs = require('./categories.documentation');

exports.Categories = class Categories extends Service {
  
    constructor(options, app) {
        
        super(options, app);

        this.docs = docs;
    
    }

};
