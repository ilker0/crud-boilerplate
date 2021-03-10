const { loginSchema, registerSchema } = require('../validations/user');
const { create, selectOne, update } = require('../database/repositories/user');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const { wrong, blocked, alreadyHave } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const config = require('../config');

class ProductService {
  createProduct = async () => {};

  getProducts = async () => {};

  updateProduct = async () => {};

  deleteProduct = async () => {};
}

module.exports = new ProductService();
