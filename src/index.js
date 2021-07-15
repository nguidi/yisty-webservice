/* eslint-disable no-console */
const dotenv = require('dotenv')
const path = require('path');
const fs = require('fs')
dotenv.config({ path: path.resolve(__dirname, '../.env'), debug: true })
const logger = require('./logger');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
