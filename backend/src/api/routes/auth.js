const { Router } = require('express');
const { login, register } = require('../../services/auth');
const httpStatusCodes = require('../../utils/httpStatusCodes');

const route = Router();

module.exports = app => {
  app.use('/auth', route);

  route.post('/login', async (request, response, next) => {
    try {
      const { accessToken, refreshToken } = await login(request.body);
      return response.status(200).json({ message: { accessToken, refreshToken } });
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
