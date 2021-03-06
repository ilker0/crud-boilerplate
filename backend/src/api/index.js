const { Router } = require('express');
const basket = require('./routes/basket');
const auth = require('./routes/auth');

module.exports = () => {
  const app = Router();
  basket(app);
  auth(app);

  return app;
};
