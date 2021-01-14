// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const manufacturers = sequelizeClient.define('manufacturers', {

    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },

    image: {
      type: DataTypes.STRING
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
  manufacturers.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return manufacturers;
};
