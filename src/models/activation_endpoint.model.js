// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const activationEndpoint = sequelizeClient.define('activation_endpoint', {
    key: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  activationEndpoint.associate = function (models) {

    const { users } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    activationEndpoint.belongsTo(users);  // agrega la columna user_id a activationEndpoint
  };

  return activationEndpoint;
};
