// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const food_preferences = sequelizeClient.define('food_preferences', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }

  }, {

    underscored: true,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }

  });

  // eslint-disable-next-line no-unused-vars
  food_preferences.associate = function (models) {

    const { users, ingredients } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    food_preferences.belongsToMany(users, {through: 'user_food_preferences'}); // crea una nueva tabla llamada 'user_food_preferences' con una columna 'food_preference_id'
    food_preferences.belongsToMany(ingredients, {through: 'forbidden_ingredients'}); // crea una nueva tabla llamada 'forbidden_ingredients' con una columna 'food_preference_id'
  };

  return food_preferences;
};
