const Joi = require('joi');

const poleNumeroSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  poles: Joi.number().required(),
  porcentaje: Joi.number().required()
});

module.exports = poleNumeroSchema;