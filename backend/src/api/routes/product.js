const { Router } = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../../services/product');
const httpStatusCodes = require('../../utils/httpStatusCodes');

const route = Router();

module.exports = app => {
  app.use('/product', route);

  route.post('/', async (request, response, next) => {
    try {
      return response.status(200).json({});
    } catch (error) {
      return next(error);
    }
  });

  route.get('/', async (request, response, next) => {
    try {
      return response.status(201).json({});
    } catch (error) {
      return next(error);
    }
  });
};
