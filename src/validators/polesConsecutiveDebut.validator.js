const Joi = require('joi');

const polesConsecutiveDebutSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  poles: Joi.number().required(),
  temporada: Joi.number().required()
});

module.exports = polesConsecutiveDebutSchema;
