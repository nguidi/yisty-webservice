// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const products = sequelizeClient.define('products', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    barcode: {
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
  products.associate = function (models) {

    const { ingredients, user_scans, user_complaints, manufacturers, categories, affiliate_shops } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    products.hasMany(user_scans); // agrega la columna 'product_id' a la tabla 'user_scans'
    products.hasMany(user_complaints); // agrega la columna 'product_id' a la tabla 'user_complaints'
    products.belongsToMany(ingredients, {through: 'product_ingredients'}); // agrega la columna 'product_id' a la tabla 'product_ingredients'
    products.belongsToMany(affiliate_shops, {through: 'affiliate_shops_products'}); // agrega la columna 'product_id' a la tabla 'affiliate_shops_products'
    products.belongsTo(manufacturers); // agrega la columna 'manufacturer_id' a la tabla 'products'
    products.belongsTo(categories); // agrega la columna 'categorie_id' a la tabla 'products'
  };

  return products;
};
