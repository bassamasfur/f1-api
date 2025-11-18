const Joi = require('joi');

const victoriaVueltaFastSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  victorias: Joi.number().required()
});

module.exports = victoriaVueltaFastSchema;