// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const ingredients = sequelizeClient.define('ingredients', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
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
  ingredients.associate = function (models) {

    const { products, user_complaints } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    ingredients.belongsToMany(products, {through: 'product_ingredients'}); // agrega la columna 'ingredient_id' a la tabla 'product_ingredients'
    ingredients.belongsToMany(user_complaints, {through: 'complaint_ingredients'}); // agrega la columna 'ingredient_id' a la tabla 'complaint_ingredients'
  };

  return ingredients;
};
