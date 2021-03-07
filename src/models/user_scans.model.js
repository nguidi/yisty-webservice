// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user_scans = sequelizeClient.define('user_scans', {

    date: {
      type: DataTypes.DATE,
      allowNull: false
    },

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
  user_scans.associate = function (models) {

    const { users } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    user_scans.belongsTo(users); // agrega la columna 'user_id' a la tabla 'user_scans'
  };

  return user_scans;
};
