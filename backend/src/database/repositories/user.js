const { getRepository } = require('typeorm');
const User = require('../entities/user');

class UserRepository {
  create = async data => {
    try {
      const userRepo = await getRepository(User);
      return userRepo.save(data);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = new UserRepository();
