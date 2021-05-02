const { loginSchema, registerSchema, forgotPasswordSchema, resetPasswordSchema } = require('../validations/user');
const { create, selectOne, update } = require('../database/repositories/user');
const errorHandler = require('../utils/errorHandler');
const { wrong, blocked, alreadyHave, notFound, notMatch } = require('../utils/errors');
const jwt = require('jsonwebtoken');
const config = require('../config');
const rabbitMQ = require('../loaders/rabbitMQ');
const { hashPassword, resolvePassword } = require('../utils/hash');

class UserService {
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

			const passResolveResult = await resolvePassword(user.password, password);

			if (!passResolveResult) {
				throw { name: 'RequestError', message: wrong('USERNAME_OR_PASSWORD') };
			}

			const generatedToken = await this.tokenSign(user);
			return generatedToken;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	userSave = async data => {
		data.password = await hashPassword(data.password);
		const result = await create(data);

		return result;
	};

	createUser = async request => {
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

			const result = await this.userSave(data);

			return result;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	refreshToken = async request => {
		try {
			const { body: data } = request;
			const { id } = data;
			const user = await selectOne({ id });

			if (data.token !== user.currentHashedRefreshToken) {
				throw { name: 'RequestError', message: wrong('SESSION_EXPIRED') };
			}

			const generatedToken = await this.tokenSign(user);
			return generatedToken;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	generateForgotPassToken = async payload => {
		const token = await jwt.sign({ email: payload.email }, config.jwtResetPassSecret, {
			expiresIn: config.jwtResetPassExpire,
		});

		update({ currentHashedResetPassToken: token }, { id: payload.id });

		return token;
	};

	forgotPasswordEmailPublish = async data => {
		try {
			const token = await this.generateForgotPassToken(data);

			rabbitMQ.publish(
				'email',
				JSON.stringify({
					emailTemplateName: 'forgotPassword',
					emailTemplateData: { href: config.clientUrl + 'auth/reset-password/', code: token },
					to: data.email,
					subject: 'Password reset',
				}),
			);
		} catch (error) {
			throw errorHandler(error);
		}
	};

	forgotPassword = async request => {
		try {
			const { body: data } = request;
			const { error } = forgotPasswordSchema.validate(data);

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			const { email } = data;
			const user = await selectOne({ email });

			if (!user) {
				throw { name: 'RequestError', message: notFound('USER') };
			}

			this.forgotPasswordEmailPublish(user);

			return true;
		} catch (error) {
			throw errorHandler(error);
		}
	};

	resetPasswordTokenMatch = async (token, email) => {
		const user = await selectOne({ email });

		if (!user) {
			return false;
		}

		if (token !== user.currentHashedResetPassToken) {
			return false;
		}

		return true;
	};

	resetPassword = async request => {
		try {
			const { body: data } = request;
			const { email, password, passwordagain } = data;
			const { error } = resetPasswordSchema.validate({ password, passwordagain });

			if (error) {
				throw { name: 'ValidationError', message: `${error.details.map(x => x.message).join(', ')}` };
			}

			if (password !== passwordagain) {
				throw { name: 'RequestError', message: notMatch('PASSWORD') };
			}

			const hashedPass = await hashPassword(data.password);
			await update({ password: hashedPass, currentHashedResetPassToken: null }, { email });

			return true;
		} catch (error) {
			throw errorHandler(error);
		}
	};
}

module.exports = new UserService();
