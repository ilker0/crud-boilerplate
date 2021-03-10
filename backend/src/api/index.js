const { Router } = require('express');
const user = require('./routes/user');
const product = require('./routes/product');
const category = require('./routes/category');

module.exports = () => {
  const app = Router();
  user(app);
  product(app);
  category(app);

  return app;
};
