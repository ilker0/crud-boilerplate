const { Router } = require('express');
const {
	login,
	createUser,
	refreshToken: refreshTokenService,
	forgotPassword,
	resetPassword,
} = require('../../services/user');
const httpStatusCodes = require('../../utils/httpStatusCodes');
const { refreshToken: refreshTokenMiddleware, resetPassword: resetPasswordTokenMiddleware } = require('../middlewares');

const route = Router();

module.exports = app => {
	app.use('/user', route);

	route.post('/', async (request, response, next) => {
		try {
			await createUser(request);
			return response.status(201).json({ message: httpStatusCodes[201] });
		} catch (error) {
			return next(error);
		}
	});

	route.post('/login', async (request, response, next) => {
		try {
			const { accessToken, refreshToken } = await login(request);
			return response.status(200).json({ message: { accessToken, refreshToken } });
		} catch (error) {
			return next(error);
		}
	});

	route.post('/refresh-token', refreshTokenMiddleware, async (request, response, next) => {
		try {
			const { accessToken, refreshToken } = await refreshTokenService(request);
			return response.status(200).json({ message: { accessToken, refreshToken } });
		} catch (error) {
			return next(error);
		}
	});

	route.post('/forgot-password', async (request, response, next) => {
		try {
			await forgotPassword(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});

	route.post('/reset-password', resetPasswordTokenMiddleware, async (request, response, next) => {
		try {
			await resetPassword(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});

	route.post('/resettoken-check', resetPasswordTokenMiddleware, async (request, response, next) => {
		try {
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});
};
