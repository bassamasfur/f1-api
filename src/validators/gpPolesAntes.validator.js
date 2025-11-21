const Joi = require('joi');

const gpPolesAntesSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  poles: Joi.number().required(),
  GP: Joi.number().required(),
  debut: Joi.number().required(),
  polesAntes: Joi.number().required()
});

module.exports = gpPolesAntesSchema;
