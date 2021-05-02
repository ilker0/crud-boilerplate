const { createCategorySchema, updateCategorySchema, deleteCategorySchema } = require('../validations/category');
const { create, update, selectOne, deleteOne, selectAll } = require('../database/repositories/category');
const errorHandler = require('../utils/errorHandler');
const { alreadyHave, notFound } = require('../utils/errors');
const queryParser = require('../utils/queryParser');

class CategoryService {
	createCategory = async request => {
		try {
			const { body: data, user } = request;
			const { error } = createCategorySchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { name } = data;

			data.user = user.id;

			const category = await selectOne({ name });

			if (category) {
				throw { name: 'RequestError', message: alreadyHave('NAME') };
			}

			const result = await create(data);
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	getCategories = async request => {
		try {
			const { query } = request;
			const parsedQuery = queryParser.parseQuery(query);
			parsedQuery.relations = ['user'];
			parsedQuery.order = {
				...parsedQuery.order,
				createdAt: 'ASC',
			};

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

	updateCategory = async request => {
		try {
			const { body: data, user } = request;
			const { error } = updateCategorySchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { id } = data;

			data.user = user.id;

			const category = await selectOne({ id });

			if (!category) {
				throw { name: 'RequestError', message: notFound('CATEGORY') };
			}

			const result = await update(data, { id });
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	deleteCategory = async request => {
		try {
			const { query: data } = request;

			const { error } = deleteCategorySchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { id } = data;
			const category = await selectOne({ id });

			if (!category) {
				throw { name: 'RequestError', message: notFound('CATEGORY') };
			}

			const result = await deleteOne({ id });
			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};
}

module.exports = new CategoryService();
