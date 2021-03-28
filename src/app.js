const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');
const SendGrid = require('@sendgrid/mail');
const ocr = require('tesseract.js');
//const SendGrid = require('@sendgrid/mail');
//SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');

// documentation
const sequelizeToJsonSchemas = require('./documentation/sequelize-to-json-schemas.js');
const swagger = require('./documentation/swagger.js');
//const swagger = require('feathers-swagger');

const tesseractWorker = ocr.createWorker({
  logger: (m) => console.log(m),
});
const initializeWorker = async() => {
  await tesseractWorker.load();
  await tesseractWorker.loadLanguage('spa');
  await tesseractWorker.initialize('spa');
};
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const sequelize = require('./sequelize');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

app.configure(sequelize);

//configure swagger
app.configure(sequelizeToJsonSchemas);
app.configure(swagger);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);

// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

//app.set('SendGrid',SendGrid)
//app.set('activation_endpoint',app.host+'/activate')
initializeWorker().finally(() => app.set('TesseractWorker', tesseractWorker));

app.set('SendGrid', SendGrid);
app.set('activation_endpoint', app.host + '/activate');

module.exports = app;
