const expressLoader = require('./express');
const databaseLoader = require('./database');

module.exports = async ({ expressApp }) => {
  await expressLoader({ app: expressApp });
  await databaseLoader();
};
