const Joi = require('joi');
const { required, max, min } = require('../utils/errors');

const loginSchema = Joi.object({
	username: Joi.string()
		.required()
		.messages({
			'any.required': required('USERNAME'),
		}),
	password: Joi.string()
		.required()
		.messages({
			'any.required': required('PASSWORD'),
		}),
});

const registerSchema = Joi.object({
	username: Joi.string()
		.required()
		.max(32)
		.messages({
			'any.required': required('USERNAME'),
			'string.max': max(32, 'USERNAME'),
		}),
	email: Joi.string()
		.required()
		.email()
		.messages({
			'any.required': required('EMAIL'),
		}),
	password: Joi.string()
		.required()
		.min(6)
		.messages({
			'any.required': required('PASSWORD'),
			'string.min': min(6, 'PASSWORD'),
		}),
	name: Joi.string()
		.required()
		.max(32)
		.messages({
			'any.required': required('NAME'),
			'string.max': max(32, 'NAME'),
		}),
	surname: Joi.string()
		.required()
		.max(32)
		.messages({
			'any.required': required('SURNAME'),
			'string.max': max(32, 'SURNAME'),
		}),
});

const forgotPasswordSchema = Joi.object({
	email: Joi.string()
		.required()
		.email()
		.messages({
			'any.required': required('EMAIL'),
		}),
});

const resetPasswordSchema = Joi.object({
	password: Joi.string()
		.required()
		.messages({
			'any.required': required('PASSWORD'),
		}),

	passwordagain: Joi.string()
		.required()
		.messages({
			'any.required': required('PASSWORDAGAIN'),
		}),
});

module.exports = {
	loginSchema,
	registerSchema,
	forgotPasswordSchema,
	resetPasswordSchema,
};
