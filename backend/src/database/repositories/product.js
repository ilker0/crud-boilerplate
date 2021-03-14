const { getRepository } = require('typeorm');
const Product = require('../entities/product');

class ProductRepository {
	create = async data => {
		try {
			const productRepo = getRepository(Product);
			const result = await productRepo.save(data);
			return result;
		} catch (error) {
			throw error;
		}
	};

	createBulk = async data => {};

	selectAll = async options => {
		try {
			const productRepo = getRepository(Product);
			const result = await productRepo.findAndCount(options);

			return result;
		} catch (error) {
			throw error;
		}
	};

	selectOne = async (filter, options) => {
		try {
			const productRepo = getRepository(Product);
			const result = await productRepo.findOne(filter, options);
			return result;
		} catch (error) {
			throw error;
		}
	};

	update = async (data, options) => {
		try {
			const productRepo = getRepository(Product);
			const result = await productRepo.update(options, data);
			return result;
		} catch (error) {
			throw error;
		}
	};

	deleteOne = async options => {
		try {
			const productRepo = getRepository(Product);
			const result = await productRepo.delete(options);
			return result;
		} catch (error) {
			return error;
		}
	};
}

module.exports = new ProductRepository();
