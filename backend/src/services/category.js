const { createCategorySchema } = require('../validations/category');
const { create, selectOne } = require('../database/repositories/category');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const { wrong, blocked, alreadyHave } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const config = require('../config');

class CategoryService {
  createCategory = async request => {
    try {
      const { body: data } = request;
      const { error } = createCategorySchema.validate(data);

      if (error) {
        throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
      }

      const { name } = data;
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

  getCategories = async () => {};

  updateCategory = async () => {};

  deleteCategory = async () => {};
}

module.exports = new CategoryService();
