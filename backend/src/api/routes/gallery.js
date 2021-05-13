const { Router } = require('express');
const { createCategory, getCategories, updateCategory, deleteCategory } = require('../../services/gallery');
const httpStatusCodes = require('../../utils/httpStatusCodes');
const { isAuth, hasRole } = require('../middlewares');
const permissions = require('../../utils/permissions');

const route = Router();

module.exports = app => {
	app.use('/gallery', isAuth, route);

	route.post('/', hasRole(['*', permissions.createPhoto]), async (request, response, next) => {
		try {
			await createCategory(request);
			return response.status(201).json({ message: httpStatusCodes[201] });
		} catch (error) {
			return next(error);
		}
	});

	route.get('/', hasRole(['*', permissions.selectPhoto]), async (request, response, next) => {
		try {
			const result = await getCategories(request);
			return response.status(200).json({ message: result });
		} catch (error) {
			return next(error);
		}
	});

	route.put('/', hasRole(['*', permissions.editPhoto]), async (request, response, next) => {
		try {
			await updateCategory(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});

	route.delete('/', hasRole(['*', permissions.deletePhoto]), async (request, response, next) => {
		try {
			await deleteCategory(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});
};
