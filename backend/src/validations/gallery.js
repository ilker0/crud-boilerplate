const Joi = require('joi');
const { required, max } = require('../utils/errors');

const createPhotoSchema = Joi.object({
	name: Joi.string()
		.required()
		.max(100)
		.messages({
			'any.required': required('NAME'),
			'string.max': max(100, 'NAME'),
		}),
});

const updatePhotoSchema = Joi.object({
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
});

const deletePhotoSchema = Joi.object({
	id: Joi.string()
		.guid()
		.required()
		.messages({
			'any.required': required('ID'),
		}),
});

module.exports = {
	createPhotoSchema,
	updatePhotoSchema,
	deletePhotoSchema,
};
