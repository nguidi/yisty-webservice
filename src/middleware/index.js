const scan = require('./scan.js');
const { authenticate } = require('@feathersjs/express');
const activateUser = require('./activate_user.js');
const recoverAccount = require('./recover_account.js');
const path = require('path');

// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
    // Add your custom middleware here. Remember that
    // in Express, the order matters.
    // Scanea la picture
    app.use('/scan', authenticate("jwt"), scan.handler(app));
    app.get('/activate_user/:key', activateUser(app));
    app.get('/recover_account/:key', recoverAccount(app));
};