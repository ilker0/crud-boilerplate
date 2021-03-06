const { Router } = require('express');
const { login, register } = require('../../services/auth');
const httpStatusCodes = require('../../utils/httpStatusCodes');

const route = Router();

module.exports = app => {
  app.use('/auth', route);

  route.post('/login', async (request, response, next) => {
    try {
      const loginServiceStatus = await login(request.body);
      return response.status(200).json({});
    } catch (error) {
      return next(error);
    }
  });

  route.post('/register', async (request, response, next) => {
    try {
      await register(request.body);
      return response.status(201).json({ message: httpStatusCodes[201] });
    } catch (error) {
      return next(error);
    }
  });
};
