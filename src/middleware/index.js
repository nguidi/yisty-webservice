const scan = require('./scan.js');
const { authenticate } = require('@feathersjs/express');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
    // Add your custom middleware here. Remember that
    // in Express, the order matters.
    // Scanea la picture
    app.use('/scan', authenticate("jwt"), scan.handler(app));
};