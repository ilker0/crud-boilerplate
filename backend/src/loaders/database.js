const { createConnection } = require('typeorm');
const config = require('../config');
const logger = require('./logger');

module.exports = async () => {
  try {
    logger.info(`✅ Database connected`);
  } catch (err) {
    logger.error(`❌ Database connection error -> ${err}`);
  }

  await createConnection();
};
