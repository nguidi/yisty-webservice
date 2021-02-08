// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const users = sequelizeClient.define('users', {
  
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }  
  
  }, {

    underscored: true,  // userID -> user_id
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
    
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {

    const { profiles, food_preferences, user_scans, user_complaints, pending_products } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    users.belongsTo(profiles);  // agrega la columna profile_id a user
    users.belongsTo(food_preferences);  // agrega la columna food_preference_id a user    
    //users.belongsToMany(food_preferences, {through: 'user_food_preferences'}); // crea una nueva tabla llamada 'user_food_preferences' con una columna user_id
    users.hasMany(user_scans); // agrega la columna 'user_id' a la tabla 'user_scans'
    users.hasMany(user_complaints); // agrega la columna 'user_id' a la tabla 'user_complaints'
    users.hasMany(pending_products); // agrega la columna 'user_id' a la tabla 'pending_products'
  };

  return users;
};
