const { getRepository } = require('typeorm');
const Category = require('../entities/category');

class CategoryRepository {
	create = async data => {
		try {
			const categoryRepo = getRepository(Category);
			const result = await categoryRepo.save(data);
			return result;
		} catch (error) {
			throw error;
		}
	};

	createBulk = async data => {};

	selectAll = async options => {
		try {
			const categoryRepo = getRepository(Category);
			const result = await categoryRepo.findAndCount(options);

			return result;
		} catch (error) {
			throw error;
		}
	};

	selectOne = async (filter, options) => {
		try {
			const categoryRepo = getRepository(Category);
			const result = await categoryRepo.findOne(filter, options);
			return result;
		} catch (error) {
			throw error;
		}
	};

	update = async (data, options) => {
		try {
			const categoryRepo = getRepository(Category);
			const result = await categoryRepo.update(options, data);
			return result;
		} catch (error) {
			throw error;
		}
	};

	deleteOne = async options => {
		try {
			const categoryRepo = getRepository(Category);
			const result = await categoryRepo.delete(options);
			return result;
		} catch (error) {
			return error;
		}
	};
}

module.exports = new CategoryRepository();
