const { Router } = require('express');
const basket = require('./routes/basket');

module.exports = () => {
  const app = Router();
  basket(app);

  return app;
};
