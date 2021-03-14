const { Router } = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../../services/product');
const httpStatusCodes = require('../../utils/httpStatusCodes');
const { isAuth, hasRole } = require('../middlewares');
const permissions = require('../../utils/permissions');

const route = Router();

module.exports = app => {
	app.use('/product', isAuth, route);

	route.post('/', hasRole(['*', permissions.createProduct]), async (request, response, next) => {
		try {
			await createProduct(request);
			return response.status(201).json({ message: httpStatusCodes[201] });
		} catch (error) {
			return next(error);
		}
	});

	route.get('/', hasRole(['*', permissions.selectProduct]), async (request, response, next) => {
		try {
			const result = await getProducts(request);
			return response.status(200).json({ message: result });
		} catch (error) {
			return next(error);
		}
	});

	route.put('/', hasRole(['*', permissions.editProduct]), async (request, response, next) => {
		try {
			await updateProduct(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});

	route.delete('/', hasRole(['*', permissions.deleteProduct]), async (request, response, next) => {
		try {
			await deleteProduct(request);
			return response.status(200).json({ message: httpStatusCodes[200] });
		} catch (error) {
			return next(error);
		}
	});
};
