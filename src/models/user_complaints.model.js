// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const user_complaints = sequelizeClient.define('user_complaints', {

    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false
    },

    active: {
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
  user_complaints.associate = function (models) {

    const { ingredients } = models;

    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    user_complaints.belongsToMany(ingredients, {through: 'complaint_ingredients'}); // agrega la columna 'user_complaint_id' a la tabla 'complaint_ingredients'
  };

  return user_complaints;
};
