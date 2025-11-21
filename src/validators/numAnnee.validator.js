const Joi = require('joi');

const numAnneeSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  temporada: Joi.number().required()
});

module.exports = numAnneeSchema;
