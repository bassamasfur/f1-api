const Joi = require('joi');

const victoriaSinPoleSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  victorias_sin_pole: Joi.number().required(),
  inicio: Joi.number().optional(),
  fin: Joi.number().optional()
});

module.exports = victoriaSinPoleSchema;
