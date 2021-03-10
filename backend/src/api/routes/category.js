const { Router } = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../../services/category');
const httpStatusCodes = require('../../utils/httpStatusCodes');
const { isAuth, hasRole } = require('../middlewares');
const permissions = require('../../utils/permissions');

const route = Router();

module.exports = app => {
	app.use('/category', isAuth, route);

	route.post('/', hasRole(['*', permissions.createCategory]), async (request, response, next) => {
		try {
			await createCategory(request);
			return response.status(201).json({ message: httpStatusCodes[201] });
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
