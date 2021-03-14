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

	route.get('/', hasRole(['*', permissions.selectCategory]), async (request, response, next) => {
		try {
			const result = await getCategories(request);
			return response.status(200).json({ message: result });
		} catch (error) {
			return next(error);
		}
	});

	route.put('/', hasRole(['*', permissions.editCategory]), async (request, response, next) => {
		try {
			await updateCategory(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});

	route.delete('/', hasRole(['*', permissions.deleteCategory]), async (request, response, next) => {
		try {
			await deleteCategory(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});
};
