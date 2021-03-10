const { Router } = require('express');
const auth = require('./routes/auth');

module.exports = () => {
  const app = Router();
  auth(app);

  return app;
};
