const { loginSchema, registerSchema } = require('../validations/auth');
const { create } = require('../database/repositories/user');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');

class AuthService {
  hashPassword = async password => {
    const hashedPass = await bcrypt.hash(password, 10);
    return hashedPass;
  };

  login = async data => {
    const { error } = loginSchema.validate(data);
    if (error) {
      throw { status: 422, message: `${error.details.map(x => x.message).join(', ')}` };
    }
  };

  register = async data => {
    const { error } = registerSchema.validate(data);
    if (error) {
      throw { status: 422, message: `${error.details.map(x => x.message).join(', ')}` };
    }

    try {
      data.password = await this.hashPassword(data.password);
      const result = await create(data);
      return result;
    } catch (error) {
      throw errorHandler(error);
    }
  };
}

module.exports = new AuthService();
