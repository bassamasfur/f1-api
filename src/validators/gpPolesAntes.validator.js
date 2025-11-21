const Joi = require('joi');

const gpPolesAntesSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  carreras: Joi.number().required()
});

module.exports = gpPolesAntesSchema;
