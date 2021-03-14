const Joi = require('joi');
const { required, max } = require('../utils/errors');

const createProductSchema = Joi.object({
	category: Joi.string()
		.guid()
		.required()
		.messages({
			'any.required': required('CATEGORY'),
		}),
	name: Joi.string()
		.required()
		.max(100)
		.messages({
			'any.required': required('NAME'),
			'string.max': max(100, 'NAME'),
		}),
	description: Joi.string()
		.required()
		.max(300)
		.messages({
			'any.required': required('DESCRIPTION'),
			'string.max': max(100, 'DESCRIPTION'),
		}),
	price: Joi.string()
		.required()
		.max(10)
		.messages({
			'any.required': required('PRICE'),
			'string.max': max(100, 'PRICE'),
		}),
	priceType: Joi.string()
		.required()
		.max(1)
		.messages({
			'any.required': required('PRICE_TYPE'),
			'string.max': max(100, 'PRICE_TYPE'),
		}),
});

const updateProductSchema = Joi.object({
	category: Joi.string()
		.guid()
		.required()
		.messages({
			'any.required': required('CATEGORY'),
		}),
	id: Joi.string()
		.guid()
		.required()
		.messages({
			'any.required': required('ID'),
		}),
	name: Joi.string()
		.required()
		.max(100)
		.messages({
			'any.required': required('NAME'),
			'string.max': max(100, 'NAME'),
		}),
	description: Joi.string()
		.required()
		.max(300)
		.messages({
			'any.required': required('DESCRIPTION'),
			'string.max': max(100, 'DESCRIPTION'),
		}),
	price: Joi.string()
		.required()
		.max(10)
		.messages({
			'any.required': required('PRICE'),
			'string.max': max(100, 'PRICE'),
		}),
	priceType: Joi.string()
		.required()
		.max(1)
		.messages({
			'any.required': required('PRICE_TYPE'),
			'string.max': max(100, 'PRICE_TYPE'),
		}),
});

const deleteProductSchema = Joi.object({
	id: Joi.string()
		.guid()
		.required()
		.messages({
			'any.required': required('ID'),
		}),
});

module.exports = {
	createProductSchema,
	updateProductSchema,
	deleteProductSchema,
};
