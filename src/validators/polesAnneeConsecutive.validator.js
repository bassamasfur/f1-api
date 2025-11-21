const Joi = require('joi');

const polesAnneeConsecutiveSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  temporadas: Joi.number().required(),
  inicio: Joi.number().required(),
  TO: Joi.string().required(),
  fin: Joi.number().required()
});

module.exports = polesAnneeConsecutiveSchema;
