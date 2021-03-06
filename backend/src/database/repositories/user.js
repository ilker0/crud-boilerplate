const { getRepository } = require('typeorm');
const User = require('../entities/user');

class UserRepository {
  create = async data => {
    try {
      const userRepo = getRepository(User);
      const result = await userRepo.save(data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  createBulk = async data => {};

  selectAll = async filter => {};

  selectOne = async filter => {
    try {
      const userRepo = getRepository(User);
      const result = await userRepo.findOne(filter);
      return result;
    } catch (error) {
      throw error;
    }
  };

  update = async (data, where) => {
    try {
      const userRepo = getRepository(User);
      const result = await userRepo.update(where, data);
      return result;
    } catch (error) {
      throw error;
    }
  };

  delete = async id => {};
}

module.exports = new UserRepository();
