const config = require('./config');
const express = require('express');
const loaders = require('./loaders');
const logger = require('./loaders/logger');

async function startServer() {
  const app = express();

  await loaders({ expressApp: app });

  app
    .listen(config.port, () => {
      logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    })
    .on('error', err => {
      logger.error(err);
      process.exit(1);
    });
}

startServer();
