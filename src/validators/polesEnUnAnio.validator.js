const Joi = require('joi');

const polesEnUnAnioSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  temporada: Joi.number().required(),
  poles: Joi.number().required(),
  OF: Joi.string().required(),
  carreras: Joi.number().required(),
  porcentaje: Joi.number().required()
});

module.exports = polesEnUnAnioSchema;
