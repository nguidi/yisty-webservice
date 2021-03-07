// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const affiliate_shops = sequelizeClient.define('affiliate_shops', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    image: {
      type: DataTypes.STRING,
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
  affiliate_shops.associate = function (models) {

    const { users, products} = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    affiliate_shops.belongsToMany(products, {through: 'affiliate_shops_products'}); // agrega la columna 'affiliate_shop_id' a la tabla 'affiliate_shops_products'
    affiliate_shops.belongsToMany(users, {through: 'user_affiliate_shops'}); // agrega la columna 'affiliate_shop_id' a la tabla 'user_affiliate_shops'
  };

  return affiliate_shops;
};
