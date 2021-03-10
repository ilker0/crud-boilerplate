const { loginSchema, registerSchema } = require('../validations/user');
const { create, selectOne, update } = require('../database/repositories/user');
const errorHandler = require('../utils/errorHandler');
const bcrypt = require('bcrypt');
const { wrong, blocked, alreadyHave } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const config = require('../config');

class AuthService {
  hashPassword = async password => {
    const result = await bcrypt.hash(password, 10);
    return result;
  };

  resolvePassword = async (hashPass, textPlainPass) => {
    const result = bcrypt.compare(textPlainPass, hashPass);
    return result;
  };

  generateToken = async payload => {
    const token = await jwt.sign({ id: payload.id, username: payload.username, role: payload.role }, config.jwtSecret, {
      expiresIn: config.jwtExpire,
    });
    return token;
  };

  generateRefreshToken = async payload => {
    const token = await jwt.sign({ id: payload.id, username: payload.username }, config.jwtRefreshSecret, {
      expiresIn: config.jwtRefreshExpire,
    });

    update({ currentHashedRefreshToken: token }, { id: payload.id });

    return token;
  };

  tokenSign = async payload => {
    return {
      accessToken: await this.generateToken(payload),
      refreshToken: await this.generateRefreshToken(payload),
    };
  };

  login = async request => {
    try {
      const { body: data } = request;
      const { error } = loginSchema.validate(data);
      if (error) {
        throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
      }

      const { username, password } = data;
      const user = await selectOne({ username }, { relations: ['role'] });

      if (!user) {
        throw { name: 'RequestError', message: wrong('USERNAME_OR_PASSWORD') };
      }

      if (user.isActive !== 1) {
        throw { name: 'RequestError', message: blocked('USER') };
      }

      const passResolveResult = await this.resolvePassword(user.password, password);

      if (!passResolveResult) {
        throw { name: 'RequestError', message: wrong('USERNAME_OR_PASSWORD') };
      }

      const generatedToken = await this.tokenSign(user);
      return generatedToken;
    } catch (error) {
      throw errorHandler(error);
    }
  };

  registerSave = async data => {
    data.password = await this.hashPassword(data.password);
    const result = await create(data);

    return result;
  };

  register = async request => {
    try {
      const { body: data } = request;
      const { error } = registerSchema.validate(data);
      if (error) {
        throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
      }

      const { username } = data;
      const user = await selectOne({ username });

      if (user) {
        throw { name: 'RequestError', message: alreadyHave('USERNAME') };
      }

      data.role = 'EDITOR';
      const result = await this.registerSave(data);

      return result;
    } catch (error) {
      throw errorHandler(error);
    }
  };
}

module.exports = new AuthService();
