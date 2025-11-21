const Joi = require('joi');

const polesConsecutiveSchema = Joi.object({
  ID: Joi.number().required(),
  nombre: Joi.string().required(),
  poles: Joi.number().required(),
  inicio: Joi.string().required(),
  TO: Joi.string().required(),
  fin: Joi.string().required()
});

module.exports = polesConsecutiveSchema;