const Joi = require('joi');
const { required, max } = require('../utils/errors');

const createCategorySchema = Joi.object({
  name: Joi.string()
    .required()
    .max(100)
    .messages({
      'any.required': required('NAME'),
      'string.max': max(100, 'NAME'),
    }),
});

module.exports = {
  createCategorySchema,
};
