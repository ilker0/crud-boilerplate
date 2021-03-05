const Joi = require('joi');

const createSchema = Joi.object({
  productId: Joi.string().guid(),
});

module.exports = {
  createSchema,
};
