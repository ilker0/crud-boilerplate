const expressLoader = require('./express');
const databaseLoader = require('./database');
const swaggerLoader = require('./swagger');
module.exports = async ({ expressApp }) => {
  await swaggerLoader({ app: expressApp });
  await expressLoader({ app: expressApp });
  await databaseLoader();
};
