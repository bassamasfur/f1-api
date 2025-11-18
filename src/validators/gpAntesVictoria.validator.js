const Joi = require('joi');

const gpAntesVictoriaSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  gp_antes_victoria: Joi.number().required(),
  inicio: Joi.number().required(),
  fin: Joi.number().required()
});

module.exports = gpAntesVictoriaSchema;
