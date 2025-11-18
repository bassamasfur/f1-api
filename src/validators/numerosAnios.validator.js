const Joi = require('joi');

const numerosAniosSchema = Joi.object({
  ID: Joi.number().integer().min(1).required(),
  nombre: Joi.string().min(2).max(100).required(),
  anios: Joi.number().integer().min(1).required()
});

const validateNumerosAnios = (data) => {
  return numerosAniosSchema.validate(data, { abortEarly: false });
};

module.exports = {
  validateNumerosAnios
};
