// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const categories = sequelizeClient.define('categories', {
    
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
  categories.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return categories;
};
