const scanMethod = require('./scan.js')

// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  // Add your custom middleware here. Remember that
  // in Express, the order matters.

  // Scanea la picture
  app.post('/scan', scanMethod);

};
