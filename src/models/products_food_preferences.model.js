// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const productsFoodPreferences = sequelizeClient.define('products_food_preferences', {

    result: {
      type: DataTypes.BOOLEAN,
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
  productsFoodPreferences.associate = function (models) {

    const { products, food_preferences } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/

    productsFoodPreferences.belongsTo(products); // agrega la columna 'product_id' a la tabla 'products_food_preference'
    productsFoodPreferences.belongsTo(food_preferences); // agrega la columna 'food_preference_id' a la tabla 'products_food_preference'

  };

  return productsFoodPreferences;
};
