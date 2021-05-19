const { createProductSchema, updateProductSchema, deleteProductSchema } = require('../validations/product');
const { create, update, selectOne, deleteOne, selectAll } = require('../database/repositories/product');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const { wrong, blocked, alreadyHave } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const config = require('../config');
const queryParser = require('../utils/queryParser');

class ProductService {
	createProduct = async request => {
		try {
			const { body: data, user } = request;
			const { error } = createProductSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { name } = data;

			data.user = user.id;

			const product = await selectOne({ name });

			if (product) {
				throw { name: 'RequestError', message: alreadyHave('NAME') };
			}

			const result = await create(data);
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	getProducts = async request => {
		try {
			const { query } = request;
			const parsedQuery = queryParser.parseQuery(query);
			parsedQuery.relations = ['category', 'user'];

			// @TODO relations fix

			const result = await selectAll(parsedQuery);
			result[0].forEach(item => {
				item.user = item.user.username;
			});

			return {
				data: result[0] || [],
				count: result[1] || 0,
			};
		} catch (error) {
			console.log(error);
			throw errorHandler(error);
		}
	};

	updateProduct = async request => {
		try {
			const { body: data, user } = request;
			const { error } = updateProductSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { id } = data;

			data.user = user.id;

			const product = await selectOne({ id });

			if (!product) {
				throw { name: 'RequestError', message: notFound('PRODUCT') };
			}

			const result = await update(data, { id });
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	deleteProduct = async request => {
		try {
			const { query: data } = request;

			const { error } = deleteProductSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { id } = data;
			const product = await selectOne({ id });

			if (!product) {
				throw { name: 'RequestError', message: notFound('PRODUCT') };
			}

			const result = await deleteOne({ id });
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};
}

module.exports = new ProductService();
