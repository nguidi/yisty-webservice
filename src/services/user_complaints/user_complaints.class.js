const { Service } = require('feathers-sequelize');
const docs = require('./user_complaints.documentation');

exports.UserComplaints = class UserComplaints extends Service {
  
  constructor(options, app) {
        
    super(options, app);

    this.docs = docs;
    
  }

};
