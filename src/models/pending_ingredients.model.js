// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const pending_ingredients = sequelizeClient.define('pending_ingredients', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.INTEGER,
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
  pending_ingredients.associate = function (models) {
    const { pending_products } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    pending_ingredients.belongsTo(pending_products);  // agrega la columna profile_id a user  
  };

  return pending_ingredients;
};
