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

  selectAll = async filter => {};

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
      const userRepo = getRepository(User);
      const result = await userRepo.update(options, data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  delete = async id => {};
}

module.exports = new CategoryRepository();
